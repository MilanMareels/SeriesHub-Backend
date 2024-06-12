import express from "express";
import { queryAllAnimeSeries } from "../../database/Anime/queryAllAnimeSeries";
import { createResponseObject, handleErrors } from "../../common/common";
import { NotFoundError } from "../../errors/error";

const router = express.Router();

router.get("/animeSeries", async (req, res) => {
	try {
		const animeSeries = await queryAllAnimeSeries();

		return createResponseObject(200, animeSeries, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
