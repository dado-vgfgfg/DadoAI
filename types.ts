
export enum MangaStyle {
  MODERN_ANIME = 'Modern Anime (Ufotable Style)',
  CLASSIC_BW = 'Classic Black & White',
  VIBRANT_WEBTOON = 'Vibrant Webtoon',
  RETRO_90S = '90s Retro Anime',
  CYBERPUNK_NEON = 'Cyberpunk Neon',
  DARK_FANTASY = 'Dark Fantasy'
}

export enum MangaGenre {
  ACTION = 'Action',
  ADVENTURE = 'Adventure',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  MYSTERY = 'Mystery',
  PSYCHOLOGICAL = 'Psychological',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  SLICE_OF_LIFE = 'Slice of Life',
  SPORTS = 'Sports',
  SUPERNATURAL = 'Supernatural',
  THRILLER = 'Thriller',
  ISEKAI = 'Isekai',
  CYBERPUNK = 'Cyberpunk',
  MECHA = 'Mecha',
  HISTORICAL = 'Historical',
  MARTIAL_ARTS = 'Martial Arts',
  MUSIC = 'Music',
  SCHOOL = 'School',
  SPACE = 'Space',
  MILITARY = 'Military',
  VAMPIRE = 'Vampire',
  DEMONS = 'Demons',
  GAME = 'Game',
  POLICE = 'Police',
  MAGICAL_GIRL = 'Magical Girl',
  PARODY = 'Parody',
  HAREM = 'Harem',
  JOSEI = 'Josei',
  SEINEN = 'Seinen',
  SHOUJO = 'Shoujo',
  SHOUNEN = 'Shounen'
}

export enum CharacterCategory {
  MAIN = 'Protagonist',
  SECONDARY = 'Supporting',
  VILLAIN = 'Antagonist'
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  category: CharacterCategory;
  personality: string;
  appearance: {
    base: string;
    hair: string;
    eyes: string;
    outfit: string;
    accessories: string;
  };
  portraitUrl?: string;
}

export interface MangaPanel {
  id: string;
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface Project {
  id: string;
  title: string;
  genres: MangaGenre[];
  style: MangaStyle;
  storyLine: string;
  characters: CharacterProfile[];
  panels: MangaPanel[];
  createdAt: number;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  tier: 'Free' | 'Pro' | 'Enterprise';
}
