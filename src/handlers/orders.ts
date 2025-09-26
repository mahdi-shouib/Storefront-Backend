import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import authorize from '../middlewares/authorize';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
	const { user_id, status } = req.body;

	if (!user_id || !status || (status !== 'open' && status !== 'complete')) {
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

const addProduct = async (req: Request, res: Response) => {
	const { product_id, quantity } = req.body;
	const order_id = req.params.id;

	if (!order_id || !product_id || !quantity) {
		res.status(400).send('Invalid Request!');
		return;
	}

	const order_product = await store.addProduct(
		order_id as string,
		product_id as string,
		quantity as number,
	);
	res.json(order_product);
};

const orders_routes = (app: express.Application) => {
	app.post('/orders', authorize, create);
	app.post('/orders/:id/products', authorize, addProduct);
};

export default orders_routes;
