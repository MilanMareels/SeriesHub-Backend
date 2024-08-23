import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { queryDeleteAnimeByAnimeId } from "../../database/Anime/queryDeleteAnimeByAnimeId";
import { checkIfAnimeExists } from "../../checks/anime/animeChecks";

const router = express.Router();

router.delete("/user/:userId/anime/:animeId", async (req, res) => {
  const userId: string = req.params.userId;
  const animeId: string = req.params.animeId;

  try {
    await validateUser(userId);

    await checkIfAnimeExists(animeId);

    await queryDeleteAnimeByAnimeId(animeId);

    return createResponseObject(200, { message: "Anime successfully deleted" }, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
