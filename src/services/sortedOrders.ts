import express, { Request, Response } from 'express';
import authorize from '../middlewares/authorize';
import { OrderStore } from '../models/order';

const store = new OrderStore();

const sorted_orders_routes = (app: express.Application) => {
	app.use(authorize);
};

export default sorted_orders_routes;
