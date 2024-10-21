import { urls } from "./urls";
import { generateClient } from "./client";
import { IPost } from "../types/posts.type";
import { listsLimit } from "./constants/listLimit";
import { IPagination, IResDto } from "../types/global.type";

// types
interface IFetchPostsReqDto extends IPagination {
  tag?: string | null;
}

interface IFetchPostsResDto extends IResDto {
  posts: IPost[];
}

type FetchPostsListType = (
  params?: IFetchPostsReqDto
) => Promise<IFetchPostsResDto>;

type FetchPostByIdType = (id: number) => Promise<IPost>;

// fetch posts by tag or all posts
export const fetchPostsList: FetchPostsListType = async (params) => {
  const client = generateClient();
  const { tag, limit = listsLimit, skip = 0 } = params || {};
  const url = tag ? urls.posts.byTag(tag) : urls.posts.list;

  const response = await client.get<IFetchPostsResDto>(url, {
    params: { limit, skip },
  });

  return response.data;
};

// fetch posts by id
export const fetchPostById: FetchPostByIdType = async (id) => {
  const client = generateClient();
  const response = await client.get<IPost>(urls.posts.byId(id));

  return response.data;
};
