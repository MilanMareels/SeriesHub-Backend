import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAnimeByAnimeId = async (animeId: string): Promise<AnimeSerie | unknown> => {
  try {
    await connectDatabase();
    return await client.db(database).collection("AnimeSeries").findOne({ animeId: animeId });
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
