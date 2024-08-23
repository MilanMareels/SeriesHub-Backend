import "dotenv/config";
import { User } from "../../types/User/User";
import { db } from "../db";

export const queryAddUser = async (newUser: User) => {
  try {
    await db.collection("users").insertOne(newUser);
  } catch (error) {
    return error;
  }
};
