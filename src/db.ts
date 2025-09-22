import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let db = new Pool();

const {
	POSTGRES_HOST,
	POSTGRES_DB,
	POSTGRES_TEST_DB,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	ENV,
} = process.env;

if (ENV === 'dev') {
	console.log('Loaded development database!');
	db = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
} else {
	console.log('Loaded test database!');
	db = new Pool({
		host: POSTGRES_HOST,
		database: POSTGRES_TEST_DB,
		user: POSTGRES_USER,
		password: POSTGRES_PASSWORD,
	});
}

export = db;
