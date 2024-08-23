import { connectDatabase, closeDatabase } from "../db";
import { MongoClient } from "mongodb";
import "dotenv/config";
import { AnimeData } from "../../types/Anime/AnimeSerie";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddAnimeToUserList = async (newAnimeSerie: AnimeData): Promise<unknown> => {
  try {
    await connectDatabase();
    return await client.db(database).collection("AnimeSeries").insertOne(newAnimeSerie);
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
