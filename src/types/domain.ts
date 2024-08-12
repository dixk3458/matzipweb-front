type MarkerColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'PURPLE';

interface DetailUser {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
  posts: Post[];
  followers: ProfileUser[];
  following: ProfileUser[];
}

type ProfileUser = Omit<DetailUser, 'posts' | 'followers' | 'following'>;

interface ImageUri {
  id?: number;
  uri: string;
}

interface Marker {
  id: number;
  latitude: number;
  longitude: number;
  color: MarkerColor;
  score: number;
}

interface Post extends Marker {
  id: number;
  address: string;
  title: string;
  description: string;
  author: ProfileUser;
  createdDate: Date | string;
  images: ImageUri[];
}

interface Comment {
  id: number;
  text: string;
  author: ProfileUser;
}

export type {
  MarkerColor,
  DetailUser,
  ProfileUser,
  ImageUri,
  Marker,
  Post,
  Comment,
};
