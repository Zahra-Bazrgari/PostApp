import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { IPost } from "../types/posts.type";
import { IUser } from "../types/users.type";
import { listsLimit } from "../api/constants/listLimit";
import { fetchPostsList } from "../api/posts.api";
import { fetchUsersListByIds } from "../api/users.api";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { AxiosError } from "axios";

interface IData {
  user: IUser;
  post: IPost;
}

export const PostsPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<IData[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const {
    data: postData,
    error,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ["posts", page, searchParams.get("tag")],
    () =>
      fetchPostsList({
        limit: listsLimit,
        skip: page * listsLimit,
        tag: searchParams.get("tag"),
      }),
    {
      keepPreviousData: true,
    }
  );

  const userIds = postData?.posts.map((post) => post.userId) || [];
  const uniqueUserIds = Array.from(new Set(userIds));

  const { data: userData } = useQuery({
    queryKey: ["fetch-users-by-ids", uniqueUserIds],
    queryFn: () => fetchUsersListByIds(uniqueUserIds),
    enabled: postData?.posts.length > 0,
    refetchOnWindowFocus: false,
  });

  const errorMessage =
    (error as AxiosError)?.response?.data?.message || "An error occurred";

  const handleLoadMore = () => {
    if (postData && postData.posts.length < postData.total) {
      setPage((prev) => prev + 1);
      setLoadingMore(true);
    }
  };

  useEffect(() => {
    if (postData && userData) {
      const newData: IData[] = postData.posts.map((post) => {
        const user = userData.find((u) => u.id === post.userId);
        return { user, post };
      });
      setData((prevData) => [...prevData, ...newData]);
      setLoadingMore(false);
    }
  }, [postData, userData]);

  return (
    <main className="min-h-screen w-full bg-darkBlue-600 px-4 text-white container mx-auto">
      <section className="mx-auto max-w-lg w-full grid grid-cols-1 gap-y-6 py-10 text-white">
        {data.map((item, index) => (
          <Link key={index} to={`/post-info/${item.post.id}`}>
            <PostCard user={item.user} post={item.post} />
          </Link>
        ))}

        {(isLoading || isFetching || loadingMore) && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}

        {isError && <div>Error: {errorMessage}</div>}

        {postData && postData.posts.length < postData.total && !isFetching && (
          <div className="flex justify-center py-5">
            <button
              onClick={handleLoadMore}
              className="bg-blue-950 text-darkBlue-600 font-bold text-sm px-4 py-2 rounded-md"
            >
              Load More...
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
