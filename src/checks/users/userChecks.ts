import { isNullOrUndefined } from "../../common/common";
import { queryUserByUserId } from "../../database/Users/queryUserByUserId";
import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { User } from "../../types/User/User";

export const validateUser = async (userId: string) => {
	const user: User = (await queryUserByUserId(userId)) as User;

	if (isNullOrUndefined(user)) throw new NotFoundError(errorMessages.userNotFound);
};
