import "dotenv/config";
import { User } from "../../types/User/User";
import { MongoClient } from "mongodb";

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddUser = async (newUser: User) => {
  try {
    await client.db(database).collection("Users").insertOne(newUser);
  } catch (error) {
    return error;
  }
};
