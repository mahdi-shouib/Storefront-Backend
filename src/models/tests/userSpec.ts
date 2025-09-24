import db from '../../db';
import bcrypt from 'bcrypt';
import { User, UserStore } from '../user';

const store = new UserStore();

describe('User Model Tests', () => {
	it('should create new user with hashed password', async () => {
		const new_user: Omit<User, 'id'> = {
			first_name: 'test_firstname',
			last_name: 'test_lastname',
			password: 'test_password',
		};
		const user = await store.create(new_user as User);
		expect(user).toBeTruthy();
		expect(
			bcrypt.compareSync(
				new_user.password + process.env.BCRYPT_SECRET,
				user.password,
			),
		).toBe(true);
	});
});
