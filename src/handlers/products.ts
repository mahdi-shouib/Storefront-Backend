import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.json(products);
};

const show = async (req: Request, res: Response) => {
	const product = await store.show(req.params.id);
	res.json(product);
};

const products_routes = (app: express.Application) => {
	app.use('/products', index);
	app.use('/products/:id', show);
};

export default products_routes;
