import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryDeleteAnimeByAnimeId = async (animeId: string): Promise<unknown> => {
  try {
    await connectDatabase();
    return await client.db(database).collection("AnimeSeries").deleteOne({ animeId: animeId });
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
