import "dotenv/config";
import { closeDatabase, connectDatabase } from "../db";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryDeleteAnimeByAnimeId = async (animeId: string): Promise<unknown> => {
  try {
    return await client.db(database).collection("AnimeSeries").deleteOne({ animeId: animeId });
  } catch (error) {
    return error;
  }
};
