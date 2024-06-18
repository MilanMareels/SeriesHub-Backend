import express from "express";

import animeSeries from "./anime/getAllAnimeSeriesOfUser";

import register from "./users/register";
import login from "./users/login";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API V1 SeriesHub"
	});
});

// Anime end-points
router.use(animeSeries);

// User end-points
router.use(register);
router.use(login);

export default router;
