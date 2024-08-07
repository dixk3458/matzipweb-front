const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
} as const;

const queryKeys = {
  AUTH: 'auth',
  MARKER: 'marker',
  POST: 'post',
  POSTS: 'posts',
  GET_PROFILE: 'getProfile',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_MARKERS: 'getMarkers',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
};

export { storageKeys, queryKeys };
