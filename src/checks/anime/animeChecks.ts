import { isNullOrUndefined } from "../../common/common";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { AnimeData } from "../../types/Anime/AnimeSerie";

export const checkIfAnimeExists = async (animeId: string) => {
  const myAnimeSerie: AnimeData = (await queryAnimeByAnimeId(animeId)) as AnimeData;

  if (isNullOrUndefined(myAnimeSerie)) {
    throw new NotFoundError(errorMessages.animeNotFound);
  }

  return myAnimeSerie;
};
