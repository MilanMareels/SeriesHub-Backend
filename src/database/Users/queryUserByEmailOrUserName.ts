import "dotenv/config";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUserByEmailOrUserName = async (email: string, userName: string) => {
  try {
    return await client
      .db(database)
      .collection("Users")
      .findOne({ $or: [{ email: email }, { userName: userName }] });
  } catch (error) {
    return error;
  }
};
