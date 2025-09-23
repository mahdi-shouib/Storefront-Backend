import db from '../db';
import bcrypt from 'bcrypt';

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

	async create(u: User): Promise<User> {
		const sql =
			'INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
		const hash = bcrypt.hashSync(
			u.password + process.env.BCRYPT_SECRET,
			process.env.SALT_ROUNDS!,
		);
		const conn = await db.connect();
		const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
		conn.release();
		return result.rows[0];
	}
}
