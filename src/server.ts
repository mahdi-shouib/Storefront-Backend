import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';
import sorted_orders_routes from './services/sortedOrders';

const app: express.Application = express();
const port: number = 3000;

const corsOptions = {
	origin: 'http://examplealloweddomain.com',
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

products_routes(app);
users_routes(app);
orders_routes(app);
sorted_orders_routes(app);

app.get('/', function (_req: Request, res: Response) {
	res.send(
		jwt.sign(
			{
				secret: bcrypt.hashSync(
					process.env.BCRYPT_SECRET!,
					parseInt(process.env.SALT_ROUNDS!),
				),
			},
			process.env.TOKEN_SECRET!,
		),
	);
});

app.listen(port, function () {
	console.log(`starting app on: http://localhost:${port}`);
});

export default app;
