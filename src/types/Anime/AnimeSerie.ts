export interface AnimeSerie {
  animeSeries: AnimeData[];
  nextPage: boolean;
}

export interface AnimeData {
  animeId: string;
  animeTitle: string;
  description: string;
  genres: Genre[];
  animeImage: string;
  animeTrailer: string;
  episodes: number;
  episodesDuration: string;
  animeStatus: string;
  userRating: number;
  userId: string;
  listStatus: string;
  animeSeason: string;
  animeScore: number;
  animeSource: string;
  animeFormat: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}
