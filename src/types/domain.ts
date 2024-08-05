type MarkerColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'PURPLE';

interface Profile {
  id: number;
  email: string;
  nickname: string | null;
  imageUri: string | null;
}

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
}

export type { MarkerColor, Profile, ImageUri, Marker, Post };
