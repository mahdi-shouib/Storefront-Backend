import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import authorize from '../middlewares/authorize';

const store = new UserStore();

const users_routes = (app: express.Application) => {};

export default users_routes;
