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
	try {
		const new_user: Omit<User, 'id'> = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			password: req.body.password,
		};
		const user = await store.create(new_user as User);
		const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET!);
		res.send(token);
	} catch (err) {
		res.status(400).send(String(err));
	}
};

const users_routes = (app: express.Application) => {
	app.use(authorize);
	app.get('/users', index);
	app.get('/users/:id', show);
	app.post('/users', create);
};

export default users_routes;
