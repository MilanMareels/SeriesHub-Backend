import "dotenv/config";
import { AnimeData } from "../../types/Anime/AnimeSerie";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddAnimeToUserList = async (newAnimeSerie: AnimeData): Promise<unknown> => {
  try {
    return await client.db(database).collection("AnimeSeries").insertOne(newAnimeSerie);
  } catch (error) {
    return error;
  }
};
