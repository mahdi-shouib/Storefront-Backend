import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import authorize from '../middlewares/authorize';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	const product = await store.show(req.params.id);
	if (!product) {
		res.status(404).send('Product Not Found!');
		return;
	}
	res.json(product);
};

const create = async (req: Request, res: Response) => {
	const { name, price, category } = req.body;

	if (!name || !price) {
		res.status(400).send('Invalid Request!');
		return;
	}

	const new_product: Omit<Product, 'id'> = {
		name,
		price,
		category,
	};
	const product = await store.create(new_product as Product);
	res.json(product);
};

const products_routes = (app: express.Application) => {
	app.get('/products', index);
	app.get('/products/:id', show);
	app.post('/products', authorize, create);
};

export default products_routes;
