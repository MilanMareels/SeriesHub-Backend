import "dotenv/config";
import { AnimeData } from "../../types/Anime/AnimeSerie";
import { db } from "../db";

export const queryAddAnimeToUserList = async (newAnimeSerie: AnimeData): Promise<unknown> => {
  try {
    await db.collection("anime_series").insertOne(newAnimeSerie);
  } catch (error) {
    return error;
  } finally {
  }
};
