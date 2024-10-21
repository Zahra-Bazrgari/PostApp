export const urls = {
  posts: {
    list: "/posts",
    byId: (id: number) => `/posts/${id}`,
    byTag: (tag: string) => `/posts/tag/${tag}`,
  },
  users: {
    list: "/users",
    byId: (id: number) => `/users/${id}`,
  },
  comments: {
    byPostId: (pid: number) => `/comments/post/${pid}`,
  },
};
