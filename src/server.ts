import express, { Request, Response } from 'express';
import products_routes from './handlers/products';

const app: express.Application = express();
const port: number = 3000;

app.use(express.json());

products_routes(app);

app.get('/', function (_req: Request, res: Response) {
	res.send('Hello World!');
});

app.listen(port, function () {
	console.log(`starting app on: http://localhost:${port}`);
});
