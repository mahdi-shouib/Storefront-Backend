import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore();

const products_routes = (app: express.Application) => {};

export default products_routes;
