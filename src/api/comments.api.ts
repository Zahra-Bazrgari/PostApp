import { urls } from "./urls";

import { generateClient } from "./client";

import { listsLimit } from "./constants/listLimit";

import { IComments } from "../types/comments.type";
import { IPagination, IResDto } from "../types/global.type";

// types
interface IFetchPostCommentsReqDto extends IPagination {
  postId: number;
}
interface IFetchPostCommentsResDto extends IResDto {
  comments: IComments[];
}
type FetchPostComments = (
  request: IFetchPostCommentsReqDto
) => Promise<IFetchPostCommentsResDto>;



//function
export const fetchPostComments: FetchPostComments = async ({
  postId,
  ...params
}) => {
  const client = generateClient();
  const { limit = listsLimit, skip = 0 } = params;

  const response = await client.get<IFetchPostCommentsResDto>(
    urls.comments.byPostId(postId),
    { params: { limit, skip } }
  );

  return response.data;
};
