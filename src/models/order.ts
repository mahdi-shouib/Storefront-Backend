import db from '../db';

export type Order = {
	id: number;
	user_id: number;
	status: string;
};

export class OrderStore {
	async addProduct(
		order_id: string,
		product_id: string,
		quantity: number,
	): Promise<Order> {
		const sql =
			'INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
		const conn = await db.connect();
		const result = await conn.query(sql, [order_id, product_id, quantity]);
		conn.release();
		return result.rows[0];
	}
}
