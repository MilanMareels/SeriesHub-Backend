import express from "express";
import { v4 as uuidv4 } from "uuid";

import { createResponseObject, handleErrors, validateBody } from "../../common/common";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { queryAddAnimeToUserList } from "../../database/Anime/queryAddAnimeToUserList";
import { validateUser } from "../../checks/users/userChecks";

const router = express.Router();

router.post("/anime", async (req, res) => {
  const { userId } = req.body;
  try {
    validateBody(req, ["animeTitle", "description", "genres", "image", "episodesDuration", "listStatus", "userId", "status", "season", "score", "source", "format"]);

    await validateUser(userId);

    const newAnimeSerie: AnimeSerie = createNewAnimeSerie(req);

    await queryAddAnimeToUserList(newAnimeSerie);

    return createResponseObject(200, { message: "Anime successfully added to your list!" }, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const createNewAnimeSerie = (req: any): AnimeSerie => {
  const { animeTitle, description, genres, image, trailer, episodes, episodesDuration, listStatus, userId, status, season, score, source, format } = req.body;
  return {
    animeId: uuidv4(),
    animeTitle: animeTitle,
    description: description,
    genres: genres,
    animeImage: image,
    animeTrailer: trailer,
    episodes: episodes,
    episodesDuration: episodesDuration,
    listStatus: listStatus,
    userId: userId,
    animeStatus: status,
    animeSeason: season,
    animeScore: score,
    animeSource: source,
    animeFormat: format,
    userRating: 0,
  };
};

export default router;
