import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { Query } from "../../types/Anime/Query";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAllAnimeSeries = async (query: Query, page: number): Promise<AnimeSerie[] | unknown> => {
  const itemsPerPage = 10;
  try {
    await connectDatabase();
    return await client
      .db(database)
      .collection("AnimeSeries")
      .find(query)
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
