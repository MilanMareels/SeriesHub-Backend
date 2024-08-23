import express from "express";

import { createResponseObject, handleErrors, validateBody } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { checkIfAnimeExists } from "../../checks/anime/animeChecks";
import { queryUpdateAnimeListStatusByAnimeId } from "../../database/Anime/queryUpdateAnimeListSatusByAnimeId";

const router = express.Router();

router.put("/myAnime", async (req, res) => {
  const { userId, animeId, newListStatus } = req.body;

  try {
    validateBody(req, ["userId", "animeId", "newListStatus"]);

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
