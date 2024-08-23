import "dotenv/config";
import { db } from "../db";

export const queryUpdateAnimeListStatusByAnimeId = async (animeId: string, newListStatus: string): Promise<unknown> => {
  try {
    await db.collection("anime_series").updateOne({ animeId: animeId }, { $set: { listStatus: newListStatus } });
  } catch (error) {
    return error;
  }
};
