import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUpdateAnimeListStatusByAnimeId = async (animeId: string, newListStatus: string): Promise<unknown> => {
  try {
    await connectDatabase();
    return await client
      .db(database)
      .collection("AnimeSeries")
      .updateOne({ animeId: animeId }, { $set: { listStatus: newListStatus } });
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
