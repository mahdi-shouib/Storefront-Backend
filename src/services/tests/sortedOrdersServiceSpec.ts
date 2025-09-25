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

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM orders');
		await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
		await conn.query('DELETE FROM users');
		await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
		conn.release();
	});
});
