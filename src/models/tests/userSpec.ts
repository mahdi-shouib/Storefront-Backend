import db from '../../db';
import bcrypt from 'bcrypt';
import { User, UserStore } from '../user';

const store = new UserStore();

describe('User Model Tests', () => {
	it('should create new user with hashed password', async () => {
		const new_user: Omit<User, 'id'> = {
			firstname: 'test_firstname',
			lastname: 'test_lastname',
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

	it('show method returns a user', async () => {
		const user = await store.show('1');
		expect(user).toBeTruthy();
	});

	it('index method returns a list of all users', async () => {
		const new_user: Omit<User, 'id'> = {
			firstname: 'test_firstname_2',
			lastname: 'test_lastname_2',
			password: 'test_password_2',
		};
		await store.create(new_user as User);
		const users = await store.index();
		expect(users).toBeTruthy();
		expect(users.length).toBe(2);
		expect(users[0].id).toBe(1);
		expect(users[1].firstname).toBe('test_firstname_2');
	});
});
