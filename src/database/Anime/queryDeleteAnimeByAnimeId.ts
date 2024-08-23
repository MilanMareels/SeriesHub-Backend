import "dotenv/config";
import { db } from "../db";

export const queryDeleteAnimeByAnimeId = async (animeId: string): Promise<unknown> => {
  try {
    await db.collection("anime_series").deleteOne({ animeId: animeId });
  } catch (error) {
    return error;
  }
};
