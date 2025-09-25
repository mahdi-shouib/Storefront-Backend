import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';

const request = supertest(app);
const order_store = new OrderStore();
const user_store = new UserStore();

describe('Order Endpoint Services Tests', () => {
	let test_token: string;
	const test_user: Omit<User, 'id'> = {
		firstname: 'test_firstname',
		lastname: 'test_lastname',
		password: 'test_password',
	};
	const test_open_order: Omit<Order, 'id'> = {
		user_id: 1,
		status: 'open',
	};
	const test_complete_order: Omit<Order, 'id'> = {
		user_id: 1,
		status: 'complete',
	};

	beforeAll(async () => {
		const user = await user_store.create(test_user as User);
		await order_store.create(test_open_order as Order);
		await order_store.create(test_open_order as Order);
		await order_store.create(test_complete_order as Order);
		await order_store.create(test_complete_order as Order);
		test_token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
	});

	it('POST /users/:id/orders/:status with invalid token fails', async () => {
		const response = await request.post('/users/1/orders/open');
		expect(response.unauthorized).toBe(true);
	});

	it('POST /users/:id/orders/:status with invalid status fails', async () => {
		const response = await request
			.post('/users/1/orders/test')
			.set('Authorization', `Bearer ${test_token}`);
		expect(response.badRequest).toBe(true);
	});

	it('POST /users/:id/orders/:status with valid token and open status returns all open orders for user', async () => {
		const response = await request
			.post('/users/1/orders/open')
			.set('Authorization', `Bearer ${test_token}`);
		const orders: Order[] = response.body;
		expect(response.ok).toBe(true);
		expect(orders.length).toBeGreaterThan(0);
		expect(orders.filter((o) => o.status !== 'open')).toEqual([]);
	});

	it('POST /users/:id/orders/:status with valid token and complete status returns all complete orders for user', async () => {
		const response = await request
			.post('/users/1/orders/complete')
			.set('Authorization', `Bearer ${test_token}`);
		const orders: Order[] = response.body;
		expect(response.ok).toBe(true);
		expect(orders.length).toBeGreaterThan(0);
		expect(orders.filter((o) => o.status !== 'complete')).toEqual([]);
	});

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM orders');
		await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
		await conn.query('DELETE FROM users');
		await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
		conn.release();
	});
});
