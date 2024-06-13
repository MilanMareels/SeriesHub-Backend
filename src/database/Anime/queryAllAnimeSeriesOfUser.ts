import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAllAnimeSeries = async (userId: string, page: number, listStatus: string): Promise<AnimeSerie[] | unknown> => {
	const itemsPerPage = 10;
	try {
		await connectDatabase();
		return await client
			.db(database)
			.collection("AnimeSeries")
			.find({ userId: userId, listStatus: listStatus })
			.skip((page - 1) * itemsPerPage)
			.limit(itemsPerPage)
			.toArray();
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
};
