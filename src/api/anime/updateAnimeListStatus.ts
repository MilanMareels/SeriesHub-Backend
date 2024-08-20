import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { checkIfAnimeExists } from "../../checks/anime/animeChecks";
import { queryUpdateAnimeListStatusByAnimeId } from "../../database/Anime/queryUpdateAnimeListSatusByAnimeId";

const router = express.Router();

router.put("/myAnime", async (req, res) => {
  const { userId, animeId, newListStatus } = req.body;

  try {
    await validateUser(userId);

    await checkIfAnimeExists(animeId);

    await queryUpdateAnimeListStatusByAnimeId(animeId, newListStatus);

    const myAnime = await queryAnimeByAnimeId(animeId);

    return createResponseObject(200, myAnime, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
