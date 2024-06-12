import express from "express";
import bycrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { createResponseObject, handleErrors, isNullOrUndefined } from "../../common/common";
import { queryUserByEmailOrUserName } from "../../database/Users/queryUserByEmailOrUserName";
import { ConflictError, UnprocessableContentError } from "../../errors/error";
import { User } from "../../types/User/User";
import { queryAddUser } from "../../database/Users/queryAddUser";
import validate from "deep-email-validator";
import { errorMessages } from "../../errors/errorMessages";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { userName, fullName, email, password } = validateBody(req);

        await validateNewUsere(email, userName);
        await validateEmail(email);

        const newUser: User = await createNewUser(userName, fullName, email, password);

        await queryAddUser(newUser);

        return createResponseObject(201, { message: 'Registration successful!' }, res);
    } catch (error) {
        return handleErrors(error, res);
    }
});

const validateBody = (req: any): any => {
    const { userName, fullName, email, password } = req.body;

    if (isNullOrUndefined(userName) || isNullOrUndefined(password) || isNullOrUndefined(fullName) || isNullOrUndefined(email)) throw new ConflictError(errorMessages.propertyMissing);

    return { userName, fullName, email, password };
}

const validateNewUsere = async (email: string, userName: string) => {
    const user = await queryUserByEmailOrUserName(email, userName);

    if (!isNullOrUndefined(user)) throw new ConflictError(errorMessages.userAlreadyExist);
};

const validateEmail = async (email: string): Promise<void> => {
    const validateEmail = await validate({ email: email, validateSMTP: false });
    const isEmailValid: boolean = validateEmail.valid;

    if (!isEmailValid) throw new UnprocessableContentError(errorMessages.invalidEmail);
};

const hashPassword = async (password: string) => {
    return await bycrypt.hash(password, 10);
};

const createNewUser = async (userName: string, fullName: string, email: string, password: string): Promise<User> => {
    return {
        userId: uuidv4(),
        userName: userName,
        fullName: fullName,
        email: email,
        password: await hashPassword(password),
        accoundCreated: new Date().getTime()
    }
};

export default router;
