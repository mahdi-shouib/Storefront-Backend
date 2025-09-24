import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import authorize from '../middlewares/authorize';

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

const users_routes = (app: express.Application) => {
	app.use(authorize);
	app.get('/users', index);
	app.get('/users/:id', show);
};

export default users_routes;
