const numbers = {
  ACCESS_TOKEN_REFRESH_TIME: 1000 * 60 * 30 - 1000 * 60 * 3, // 27분
  ZOOM: 14,
  DEFAULT_LATITUDE: 37.5665,
  DEFAULT_LONGITUDE: 126.978,
  DEFAULT_SCORE: 3,
} as const;

export { numbers };
