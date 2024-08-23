import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { Query } from "../../types/Anime/Query";
import { closeDatabase, connectDatabase } from "../db";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAllAnimeSeries = async (query: Query, page: number): Promise<AnimeSerie[] | unknown> => {
  const itemsPerPage = 10;
  try {
    await connectDatabase();
    const animeSeries = await client
      .db(database)
      .collection("AnimeSeries")
      .find(query)
      .project({ animeTitle: 1, animeId: 1, animeImage: 1 })
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage + 1)
      .toArray();

    const nextPage = animeSeries.length > itemsPerPage;

    if (nextPage) animeSeries.pop();

    return {
      nextPage,
      animeSeries,
    };
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
};
