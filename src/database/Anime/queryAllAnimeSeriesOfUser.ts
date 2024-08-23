import "dotenv/config";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { Query } from "../../types/Anime/Query";
import { db } from "../db";

export const queryAllAnimeSeries = async (query: Query, page: number): Promise<AnimeSerie[] | unknown> => {
  const itemsPerPage = 10;
  try {
    const animeSeries = await db
      .collection("anime_series")
      .find(query)
      .sort({ _id: 1 })
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
    //return error;
    console.log(error);
  }
};
