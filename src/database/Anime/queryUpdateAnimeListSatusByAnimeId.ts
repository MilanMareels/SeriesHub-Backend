import "dotenv/config";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUpdateAnimeListStatusByAnimeId = async (animeId: string, newListStatus: string): Promise<unknown> => {
  try {
    await client
      .db(database)
      .collection("AnimeSeries")
      .updateOne({ animeId: animeId }, { $set: { listStatus: newListStatus } });
  } catch (error) {
    return error;
  }
};
