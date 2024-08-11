const storageKeys = {
  ACCESS_TOKEN: 'accessToken',
} as const;

const queryKeys = {
  AUTH: 'auth',
  MARKER: 'marker',
  POST: 'post',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKE: 'like',
  BOOKMARK: 'bookmark',
  GET_PROFILE: 'getProfile',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_MARKERS: 'getMarkers',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
  GET_COMMENTS: 'getComments',
  GET_LIKE: 'getLike',
  GET_BOOKMARK: 'getBookmark',
};

export { storageKeys, queryKeys };
