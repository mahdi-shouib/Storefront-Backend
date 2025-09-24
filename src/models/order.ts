import db from '../db';

export type Order = {
	id: number;
	user_id: number;
	status: string;
};

export class OrderStore {}
