import db from '../db';

export type Order = {
	id: number;
	user_id: number;
	status: string;
};

export class OrderStore {
	async create(o: Order): Promise<Order> {
		const sql =
			'INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *';
		const conn = await db.connect();
		const result = await conn.query(sql, [o.user_id, o.status]);
		conn.release();
		return result.rows[0];
	}

	async orderByStatus(id: string, status: string): Promise<Order[]> {
		const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
		const conn = await db.connect();
		const result = await conn.query(sql, [id, status]);
		conn.release();
		return result.rows;
	}

	async addProduct(
		order_id: string,
		product_id: string,
		quantity: number,
	): Promise<{
		id: number;
		order_id: number;
		product_id: number;
		quantity: number;
	}> {
		const sql =
			'INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
		const conn = await db.connect();
		const result = await conn.query(sql, [order_id, product_id, quantity]);
		conn.release();
		return result.rows[0];
	}
}
