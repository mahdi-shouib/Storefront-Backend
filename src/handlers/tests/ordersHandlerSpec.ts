import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { Order } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const request = supertest(app);
const user_store = new UserStore();
const product_store = new ProductStore();

describe('Order Endpoints Tests', () => {
	let test_token: string;
	const test_user: Omit<User, 'id'> = {
		firstname: 'test_firstname',
		lastname: 'test_lastname',
		password: 'test_password',
	};
	const test_product: Omit<Product, 'id'> = {
		name: 'test_product',
		price: 100,
		category: 'test_category',
	};

	beforeAll(async () => {
		const user = await user_store.create(test_user as User);
		await product_store.create(test_product as Product);
		test_token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
	});

	it('POST /orders with invalid token fails', async () => {
		const test_order: Omit<Order, 'id'> = {
			user_id: 1,
			status: 'open',
		};
		const response = await request.post('/orders').send(test_order);
		expect(response.unauthorized).toBe(true);
	});

	it('POST /orders with valid token creates a new order', async () => {
		const test_order: Omit<Order, 'id'> = {
			user_id: 1,
			status: 'open',
		};
		const response = await request
			.post('/orders')
			.set('Authorization', `Bearer ${test_token}`)
			.send(test_order);
		expect(response.ok).toBe(true);
		expect(response.body).toEqual({
			id: 1,
			...test_order,
		});
	});

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM orders');
		await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
		await conn.query('DELETE FROM users');
		await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
		await conn.query('DELETE FROM products');
		await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
		conn.release();
	});
});
