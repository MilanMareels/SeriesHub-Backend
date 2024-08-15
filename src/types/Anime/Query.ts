export interface Query {
  userId: string;
  listStatus: string;
  animeTitle?: { $regex: string; $options: string };
}
