import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { queryDeleteAnimeByAnimeId } from "../../database/Anime/queryDeleteAnimeByAnimeId";

const router = express.Router();

router.delete("/user/:userId/anime/:animeId", async (req, res) => {
  const userId: string = req.params.userId;
  const animeId: string = req.params.animeId;

  try {
    await validateUser(userId);

    const myAnimeSerie: AnimeSerie = (await queryAnimeByAnimeId(animeId)) as AnimeSerie;
    checkIfAnimeExists(myAnimeSerie);

    await queryDeleteAnimeByAnimeId(animeId);

    return createResponseObject(200, { message: "Anime successfully deleted" }, res);
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
