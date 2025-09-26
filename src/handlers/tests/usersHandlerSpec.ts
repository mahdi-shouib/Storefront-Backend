import supertest from 'supertest';
import app from '../../server';
import jwt from 'jsonwebtoken';
import db from '../../db';
import { User, UserStore } from '../../models/user';

const request = supertest(app);
const store = new UserStore();

describe('User Endpoints Tests', () => {
	let test_token: string;
	const test_user: Omit<User, 'id'> = {
		firstname: 'test_firstname',
		lastname: 'test_lastname',
		password: 'test_password',
	};

	beforeAll(async () => {
		const user = await store.create(test_user as User);
		test_token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
	});

	it('GET /users with valid token returns a list of all users', async () => {
		const response = await request
			.get('/users')
			.set('Authorization', `Bearer ${test_token}`);
		expect(response.ok).toBe(true);
		expect(response.body.length).toBe(1);
		expect(response.body[0].firstname).toBe('test_firstname');
	});

	it('GET /users with invalid token should fail', async () => {
		const response = await request.get('/users');
		expect(response.unauthorized).toBe(true);
	});

	it('GET /users/:id with invalid token fails', async () => {
		const response = await request.get('/users/1');
		expect(response.unauthorized).toBe(true);
	});

	it('GET /users/:id with valid token but invalid id return not found', async () => {
		const response = await request
			.get('/users/10')
			.set('Authorization', `Bearer ${test_token}`);
		expect(response.notFound).toBe(true);
	});

	it('GET /users/:id with valid token and valid id return user', async () => {
		const response = await request
			.get('/users/1')
			.set('Authorization', `Bearer ${test_token}`);
		expect(response.ok).toBe(true);
		expect(response.body.firstname).toBe('test_firstname');
	});

	it('POST /users with valid body returns token', async () => {
		const response = await request.post('/users').send(test_user);
		expect(response.ok).toBe(true);
		expect(() => {
			jwt.verify(response.text, process.env.TOKEN_SECRET!);
		}).not.toThrow();
	});

	it('POST /users with invalid body fails', async () => {
		const response = await request.post('/users').send({
			firstname: 'test',
			lastname: 'test',
		});
		expect(response.badRequest).toBe(true);
		expect(() => {
			jwt.verify(response.text, process.env.TOKEN_SECRET!);
		}).toThrow();
	});

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM users');
		await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
		conn.release();
	});
});
