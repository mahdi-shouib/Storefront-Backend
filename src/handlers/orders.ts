import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import authorize from '../middlewares/authorize';

const store = new OrderStore();

const orders_routes = (app: express.Application) => {
	app.use(authorize);
};

export default orders_routes;
