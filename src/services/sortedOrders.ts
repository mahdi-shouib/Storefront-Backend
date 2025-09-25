import express, { Request, Response } from 'express';
import authorize from '../middlewares/authorize';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const orderByStatus = async (req: Request, res: Response) => {
	const { id, status } = req.params;

	if (!id || (status !== 'open' && status !== 'complete')) {
		res.status(400).send('Invalid Request!');
		return;
	}

	const orders = await store.orderByStatus(id, status);
	res.json(orders);
};

const sorted_orders_routes = (app: express.Application) => {
	app.use(authorize);
	app.get('/users/:id/orders/:status', orderByStatus);
};

export default sorted_orders_routes;
