import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { validateUser } from "../../checks/users/userChecks";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { queryAnimeByAnimeId } from "../../database/Anime/queryAnimeByAnimeId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { User } from "../../types/User/User";

const router = express.Router();

router.get("/user/:userId", async (req, res) => {
  const userId: string = req.params.userId;

  try {
    const user: User = await validateUser(userId);

    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
