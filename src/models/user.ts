import db from '../db';

export type User = {
	id: number;
	first_name: string;
	last_name: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		const sql = 'SELECT * FROM users';
		const conn = await db.connect();
		const result = await conn.query(sql);
		conn.release();
		return result.rows;
	}

	async show(id: string): Promise<User> {
		const sql = 'SELECT * FROM users WHERE id=($1)';
		const conn = await db.connect();
		const result = await conn.query(sql, [id]);
		conn.release();
		return result.rows[0];
	}
}
