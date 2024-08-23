import "dotenv/config";
import { db } from "../db";

export const queryUserByEmailOrUserName = async (email: string, userName: string) => {
  try {
    return await db.collection("users").findOne({ $or: [{ email: email }, { userName: userName }] });
  } catch (error) {
    return error;
  }
};
