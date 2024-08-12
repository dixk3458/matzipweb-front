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
  SEARCH: 'search',
  GET_PROFILE: 'getProfile',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_MARKERS: 'getMarkers',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
  GET_COMMENTS: 'getComments',
  GET_LIKE: 'getLike',
  GET_BOOKMARK: 'getBookmark',
  GET_SEARCH_USER: 'getSearchUser',
};

export { storageKeys, queryKeys };
