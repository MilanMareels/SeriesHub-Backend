import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";

const router = express.Router();

router.get("/user/:userId/anime/:animeId", async (req, res) => {
  const userId: string = req.params.userId;
  const animeId: string = req.params.animeId;

  try {
    await validateUser(userId);

    const myAnimeSerie: AnimeSerie = (await queryAnimeByAnimeId(animeId)) as AnimeSerie;

    checkIfAnimeExists(myAnimeSerie);

    return createResponseObject(200, myAnimeSerie, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const checkIfAnimeExists = (myAnimeSerie: AnimeSerie) => {
  if (!myAnimeSerie) {
    throw new NotFoundError(errorMessages.animeNotFound);
  }
};

export default router;
