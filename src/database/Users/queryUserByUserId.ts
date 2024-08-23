import "dotenv/config";
import { User } from "../../types/User/User";
import { db } from "../db";

export const queryUserByUserId = async (userId: string): Promise<User | unknown> => {
  try {
    return await db.collection("users").findOne({ userId: userId });
  } catch (error) {
    return error;
  }
};
