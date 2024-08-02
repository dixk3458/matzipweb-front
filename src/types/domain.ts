interface Profile {
  id: string;
  email: string;
  nickname: string | null;
  imageUri: string | null;
}

type MarkerColor = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW' | 'PURPLE';

export type { Profile, MarkerColor };
