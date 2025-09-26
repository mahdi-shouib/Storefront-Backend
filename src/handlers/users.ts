import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import authorize from '../middlewares/authorize';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
	const users = await store.index();
	res.json(users);
};

const show = async (req: Request, res: Response) => {
	const user = await store.show(req.params.id);
	if (!user) {
		res.status(404).send('User Not Found!');
		return;
	}
	res.json(user);
};

const create = async (req: Request, res: Response) => {
	const { firstname, lastname, password } = req.body;

	if (!firstname || !lastname || !password) {
		res.status(400).send('Invalid Request!');
		return;
	}

	const new_user: Omit<User, 'id'> = {
		firstname,
		lastname,
		password,
	};
	const user = await store.create(new_user as User);
	const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
	res.send(token);
};

const users_routes = (app: express.Application) => {
	app.get('/users', authorize, index);
	app.get('/users/:id', authorize, show);
	app.post('/users', create);
};

export default users_routes;
