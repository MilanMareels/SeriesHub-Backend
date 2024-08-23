import "dotenv/config";
import { User } from "../../types/User/User";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUserByUserId = async (userId: string): Promise<User | unknown> => {
  try {
    return await client.db(database).collection("Users").findOne({ userId: userId });
  } catch (error) {
    return error;
  }
};
