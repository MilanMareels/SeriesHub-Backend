import express from "express";

import animeSeries from "./anime/getAllAnimeSeries";

const router = express.Router();

router.get("/", (req, res) => {
	res.json({
		message: "API V1 SeriesHub"
	});
});

router.use(animeSeries);

export default router;
