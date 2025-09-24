import db from '../../db';
import { Order, OrderStore } from '../order';
import { User, UserStore } from '../user';

const store = new OrderStore();
const user_store = new UserStore();

describe('Order Model Tests', () => {
	beforeAll(async () => {
		const new_user: Omit<User, 'id'> = {
			firstname: 'test_firstname',
			lastname: 'test_lastname',
			password: 'test_password',
		};
		await user_store.create(new_user as User);
	});

	it('should create a new order', async () => {
		const new_order: Omit<Order, 'id'> = {
			user_id: 1,
			status: 'open',
		};
		const order = await store.create(new_order as Order);
		expect(order).toBeTruthy();
		expect(order.status).toBe('open');
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
