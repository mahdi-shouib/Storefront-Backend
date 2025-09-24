import db from '../../db';
import { Order, OrderStore } from '../order';
import { Product, ProductStore } from '../product';
import { User, UserStore } from '../user';

const store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

describe('Order Model Tests', () => {
	beforeAll(async () => {
		const new_user: Omit<User, 'id'> = {
			firstname: 'test_firstname',
			lastname: 'test_lastname',
			password: 'test_password',
		};
		const new_product: Omit<Product, 'id'> = {
			name: 'test_product',
			price: 100,
		};
		await user_store.create(new_user as User);
		await product_store.create(new_product as Product);
	});

	it('should create a new open order', async () => {
		const new_order: Omit<Order, 'id'> = {
			user_id: 1,
			status: 'open',
		};
		const order = await store.create(new_order as Order);
		expect(order).toBeTruthy();
		expect(order.status).toBe('open');
	});

	it('should create a new complete order', async () => {
		const new_order: Omit<Order, 'id'> = {
			user_id: 1,
			status: 'complete',
		};
		const order = await store.create(new_order as Order);
		expect(order).toBeTruthy();
		expect(order.status).toBe('complete');
	});

	it('order by status method returns a list of all orders by user id and status', async () => {
		const openOrders = await store.orderByStatus('1', 'open');
		const completeOrders = await store.orderByStatus('1', 'complete');
		expect(openOrders).toBeTruthy();
		expect(openOrders.length).toBe(1);
		expect(openOrders[0].status).toBe('open');
		expect(completeOrders).toBeTruthy();
		expect(completeOrders.length).toBe(1);
		expect(completeOrders[0].status).toBe('complete');
	});

	it('should add a new product to join table', async () => {
		const order_product = await store.addProduct('1', '1', 10);
		expect(order_product).toBeTruthy();
		expect(order_product.order_id).toBe(1);
		expect(order_product.product_id).toBe(1);
		expect(order_product.quantity).toBe(10);
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
