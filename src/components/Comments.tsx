import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostComments } from "../api/comments.api"; 
import { IComments } from "../types/comments.type";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";

export const Comments: React.FC = () => {
  const { id } = useParams(); 
  const [page, setPage] = useState<number>(0); 

  const {
    data: commentsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(
    ["comments", id, page],
    () => fetchPostComments({ postId: Number(id), limit: 10, skip: page * 10 }),
    { keepPreviousData: true, enabled: !!id } 
  );

  const handleLoadMore = () => {
    if (commentsData && commentsData.comments.length < commentsData.total) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading || isFetching) {
    return <p className="text-center text-white">Loading comments...</p>;
  }

  if (isError) {
    const errorMessage =
      (error as AxiosError)?.response?.data?.message || "An error occurred";
    return <p className="text-center text-red-500">Error: {errorMessage}</p>;
  }

  return (
    <section className="bg-darkBlue-600 text-white p-4 rounded-md mt-6">
      <h2 className="text-lg font-bold mb-4">Comments</h2>

      {commentsData?.comments.length ? (
        <>
          <ul className="space-y-4">
            {commentsData.comments.map((comment: IComments) => (
              <li key={comment.id} className="bg-blue-950 p-4 rounded-md">
                <p className="font-semibold">{comment.body}</p>
                <p className="text-sm mt-1 text-gray-400">
                  By {comment.user.username}
                </p>
              </li>
            ))}
          </ul>

          {commentsData.comments.length < commentsData.total && (
            <div className="flex justify-center py-4">
              <button
                onClick={handleLoadMore}
                className="bg-blue-950 text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-darkBlue-500"
              >
                Load More Comments
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center">No comments yet.</p>
      )}
    </section>
  );
};
