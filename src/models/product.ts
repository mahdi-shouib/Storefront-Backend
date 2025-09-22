import db from '../db';

export type Product = {
	id: number;
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		const sql = 'SELECT * FROM products';
		const conn = await db.connect();
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}
}
