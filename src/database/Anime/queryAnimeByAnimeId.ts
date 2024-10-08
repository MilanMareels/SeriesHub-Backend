import "dotenv/config";
import { AnimeData } from "../../types/Anime/AnimeSerie";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAnimeByAnimeId = async (animeId: string): Promise<AnimeData | unknown> => {
  try {
    return await client.db(database).collection("AnimeSeries").findOne({ animeId: animeId });
  } catch (error) {
    return error;
  }
};
