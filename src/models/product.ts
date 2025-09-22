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

	async show(id: string): Promise<Product> {
		const sql = 'SELECT * FROM products WHERE id=($1)';
		const conn = await db.connect();
		const result = await conn.query(sql, [id]);
		conn.release();
		return result.rows[0];
	}

	async create(p: Product): Promise<Product> {
		const sql = 'INSERT INTO products(name, price) VALUES($1, $2) RETURNING *';
		const conn = await db.connect();
		const result = await conn.query(sql, [p.name, p.price]);
		conn.release();
		return result.rows[0];
	}
}
