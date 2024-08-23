import "dotenv/config";
import { AnimeData } from "../../types/Anime/AnimeSerie";
import { db } from "../db";

export const queryAnimeByAnimeId = async (animeId: string): Promise<AnimeData | unknown> => {
  try {
    return await db.collection("anime_series").findOne({ animeId: animeId });
  } catch (error) {
    return error;
  }
};
