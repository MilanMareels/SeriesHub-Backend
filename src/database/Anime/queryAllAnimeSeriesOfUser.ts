import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { Query } from "../../types/Anime/Query";

export const queryAllAnimeSeries = async (query: Query, page: number): Promise<AnimeSerie[] | unknown> => {
  const itemsPerPage = 10;
  try {
  } catch (error) {
    return error;
  }
};
