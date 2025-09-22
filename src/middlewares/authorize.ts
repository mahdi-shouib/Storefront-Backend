import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authorize = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response | void> => {
	try {
		const auth = req.headers.authorization;
		const token = auth?.split(' ')[1];
		jwt.verify(token!, process.env.TOKEN_SECRET!);
	} catch (err) {
		return res.status(401).send(String(err));
	}
	next();
};
