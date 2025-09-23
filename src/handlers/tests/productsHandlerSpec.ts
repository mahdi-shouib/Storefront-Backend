import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import db from '../../db';

const request = supertest(app);

describe('Product Endpoints Tests', () => {
	let test_token: string;
	const test_product = {
		name: 'test_product',
		price: 100,
		category: 'test_category',
	};

	beforeAll(async () => {
		const test_user = {
			id: 1,
			username: 'test_username',
			password: 'test_password',
		};
		test_token = jwt.sign(test_user, process.env.TOKEN_SECRET!);
	});

	it('POST /products with valid token creates a product', async () => {
		const response = await request
			.post('/products')
			.set('Authorization', `Bearer ${test_token}`)
			.send(test_product);
		expect(response.ok).toBe(true);
		expect(response.body).toEqual({
			id: 1,
			...test_product,
		});
	});

	it('POST /products with invalid token should fail', async () => {
		const response = await request.post('/products').send(test_product);
		expect(response.unauthorized).toBe(true);
	});

	it('GET /products should return list of all products', async () => {
		const response = await request.get('/products');
		expect(response.ok).toBe(true);
		expect(response.body.length).toBe(1);
		expect(response.body[0].price).toBe(100);
	});

	it('GET /products/:id with valid id should return product', async () => {
		const response = await request.get('/products/1');
		expect(response.ok).toBe(true);
		expect(response.body.category).toBe('test_category');
	});

	it('GET /products/:id with invalid id should return not found', async () => {
		const response = await request.get('/products/10');
		expect(response.notFound).toBe(true);
	});

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM products');
		await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
		conn.release();
	});
});
