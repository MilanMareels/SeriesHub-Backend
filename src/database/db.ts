import { DataAPIClient } from "@datastax/astra-db-ts";
import "dotenv/config";

const astra_token = process.env.ASTRATOKEN!;
const dataBase = process.env.DATABASE!;

const client = new DataAPIClient(astra_token);
export const db = client.db(dataBase);
