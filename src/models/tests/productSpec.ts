import db from '../../db';
import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model Tests', () => {
	it('should create a new product without category', async () => {
		const new_product: Omit<Product, 'id'> = {
			name: 'product_without_category',
			price: 100,
		};
		const product = await store.create(new_product as Product);
		expect(product).toBeTruthy();
		expect(product.category).toBeFalsy();
	});

	it('should create a new product with category', async () => {
		const new_product: Omit<Product, 'id'> = {
			name: 'product_without_category',
			price: 200,
			category: 'category',
		};
		const product = await store.create(new_product as Product);
		expect(product).toBeTruthy();
		expect(product.category).toBeTruthy();
	});

	it('show method returns a product', async () => {
		const product = await store.show('2');
		expect(product).toBeTruthy();
	});

	it('index method returns a list of all products', async () => {
		const products = await store.index();
		expect(products).toBeTruthy();
		expect(products.length).toBe(2);
		expect(products[0].id).toBe(1);
		expect(products[1].category).toBe('category');
	});

	afterAll(async () => {
		const conn = await db.connect();
		await conn.query('DELETE FROM products');
		await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
		conn.release();
	});
});
