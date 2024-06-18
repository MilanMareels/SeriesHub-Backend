import express from "express";
import bycrypt from "bcrypt";

import { createResponseObject, handleErrors, isNullOrUndefined, validateBody } from "../../common/common";
import { queryUserByEmailOrUserName } from "../../database/Users/queryUserByEmailOrUserName";
import { errorMessages } from "../../errors/errorMessages";
import { NotFoundError, UnauthorizedError } from "../../errors/error";
import { User } from "../../types/User/User";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { text, password } = validateBody(req, ["text", "password"]);

    const user: User = await findUser(text, text);
    await validatePassword(password, user.password);

    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const findUser = async (email: string, userName: string): Promise<User> => {
  const user = (await queryUserByEmailOrUserName(email, userName)) as User;

  if (isNullOrUndefined(user)) throw new NotFoundError(errorMessages.userNotFound);

  return user;
};

const validatePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bycrypt.compare(password, hashedPassword);

  if (!isMatch) throw new UnauthorizedError(errorMessages.invalidPassword);
};

export default router;
