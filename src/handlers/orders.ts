import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import authorize from '../middlewares/authorize';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
	const { user_id, status } = req.body;

	if (!user_id || !status) {
		res.status(400).send('Invalid Request!');
		return;
	}

	const new_order: Omit<Order, 'id'> = {
		user_id,
		status,
	};

	const order = await store.create(new_order as Order);
	res.json(order);
};

const orders_routes = (app: express.Application) => {
	app.use(authorize);
	app.post('/orders', create);
};

export default orders_routes;
