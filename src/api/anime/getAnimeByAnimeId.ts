import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { checkIfAnimeExists } from "../../checks/anime/animeChecks";

const router = express.Router();

router.get("/user/:userId/anime/:animeId", async (req, res) => {
  const userId: string = req.params.userId;
  const animeId: string = req.params.animeId;

  try {
    await validateUser(userId);

    const myAnimeSerie = await checkIfAnimeExists(animeId);

    return createResponseObject(200, myAnimeSerie, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
