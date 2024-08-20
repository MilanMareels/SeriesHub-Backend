import express from "express";

import animeSeries from "./anime/getAllAnimeSeriesOfUser";
import animeSerie from "./anime/getAnimeByAnimeId";
import addAnimeSeries from "./anime/addAnimeToUserList";

import register from "./users/register";
import login from "./users/login";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API V1 SeriesHub",
  });
});

// Anime end-points
router.use(animeSeries);
router.use(animeSerie);
router.use(addAnimeSeries);

// User end-points
router.use(register);
router.use(login);

export default router;
