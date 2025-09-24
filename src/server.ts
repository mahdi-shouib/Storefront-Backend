import express, { Request, Response } from 'express';
import cors from 'cors';
import products_routes from './handlers/products';
import users_routes from './handlers/users';

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

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log(`starting app on: http://localhost:${port}`);
});

export default app;
