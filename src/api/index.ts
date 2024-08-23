import express from "express";

import animeSeries from "./anime/getAllAnimeSeriesOfUser";
import animeSerie from "./anime/getAnimeByAnimeId";
import deleteAnimeSerie from "./anime/deleteAnimeByAnimeId";
import updateAnimeSerie from "./anime/updateAnimeListStatus";
import addAnimeSeries from "./anime/addAnimeToUserList";

import register from "./users/register";
import login from "./users/login";
import user from "./users/getUserByUserId";
import { closeDatabase, connectDatabase } from "../database/db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await connectDatabase();
    return res.json({
      message: "API V1 SeriesHub",
    });
  } catch (error) {
    return error;
  } finally {
    await closeDatabase();
  }
});

// Anime end-points
router.use(animeSeries);
router.use(animeSerie);
router.use(deleteAnimeSerie);
router.use(updateAnimeSerie);
router.use(addAnimeSeries);

// User end-points
router.use(register);
router.use(login);
router.use(user);

export default router;
