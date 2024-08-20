import express from "express";

import { createResponseObject, handleErrors } from "../../common/common";
import { listStatusEnum } from "../../enums/listStatusEnum";
import { queryAllAnimeSeries } from "../../database/Anime/queryAllAnimeSeriesOfUser";
import { AnimeSerie } from "../../types/Anime/AnimeSerie";
import { validateUser } from "../../checks/users/userChecks";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { Query } from "../../types/Anime/Query";

const router = express.Router();

router.get("/user/:userId/myAnimeSeries", async (req, res) => {
  const userId: string = req.params.userId;
  const page = parseInt(req.query.page as string) || 1;
  const listStatus: string = (req.query.listStatus as string) || "2";
  const animeTitle: string = req.query.search as string;

  const definedListStatus: string = defineListStatus(listStatus);
  try {
    await validateUser(userId);

    let query: Query = {
      userId: userId,
      listStatus: definedListStatus,
    };

    if (animeTitle) {
      query["animeTitle"] = { $regex: animeTitle, $options: "i" };
    }

    const myAnimeSeries: AnimeSerie = (await queryAllAnimeSeries(query, page)) as AnimeSerie;

    checkIfUserHasAnimeSeries(myAnimeSeries, definedListStatus);

    return createResponseObject(200, myAnimeSeries, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const defineListStatus = (listStatus: string): string => {
  switch (listStatus) {
    case "1":
      return listStatusEnum[1];
    case "2":
      return listStatusEnum[2];
    case "3":
      return listStatusEnum[3];
    default:
      return "0";
  }
};

const checkIfUserHasAnimeSeries = (myAnimeSeries: AnimeSerie, definedListStatus: string) => {
  if (myAnimeSeries.animeSeries.length <= 0) throw new NotFoundError(errorMessages.userHasNoAnimeSeries(definedListStatus));
};

export default router;
