import { ObjectId } from "mongodb";

export interface AnimeSerie {
	_id: ObjectId;
	animeId: string;
	animeTitile: string;
	genres: string[];
	description: string;
	episodes: number;
	animeStatus: string;
	userRating: number;
	image: string;
	userId: string;
	listStatus: string;
}
