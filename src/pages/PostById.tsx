import React, { useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api/posts.api";
import { fetchSingleUserById } from "../api/users.api";
import { fetchPostComments } from "../api/comments.api"; 
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { Comments } from "../components/Comments";

const PostById: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));
  
  const [showComments, setShowComments] = useState<boolean>(false); 
  
  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: validId,
  });

  const userQuery = useQuery({
    queryKey: ["user", postQuery.data?.userId],
    queryFn: () => fetchSingleUserById(Number(postQuery.data?.userId)),
    enabled: postQuery.isSuccess,
  });

  const commentsQuery = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchPostComments({ postId: Number(id), limit: 10, skip: 0 }),
    enabled: showComments,
  });

  if (
    !validId ||
    (postQuery.error as AxiosError)?.response?.status === 404 ||
    (userQuery.error as AxiosError)?.response?.status === 404
  ) {
    return <div>Error: Post not found!</div>;
  }

  if (!userQuery.isSuccess || !postQuery.isSuccess) {
    return (
      <section className="mx-auto max-w-lg w-full py-8">
        <PostCardSkeleton />
      </section>
    );
  }

  return (
    <section className="max-w-lg w-full py-8 bg-darkBlue-600 text-white rounded-lg container mx-auto">
      <PostCard extendBody={true} user={userQuery.data} post={postQuery.data} />

      <div className="flex justify-center pt-5 text-white">
        <button
          onClick={() => setShowComments(!showComments)}
          className="bg-blue-950 text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-darkBlue-500"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      </div>

      {showComments && (
        <div className="mt-6">
          {commentsQuery.isLoading ? (
            <p className="text-center">Loading comments...</p>
          ) : commentsQuery.isError ? (
            <p className="text-center text-red-500">
              Error: {(commentsQuery.error as AxiosError)?.response?.data?.message || "Failed to load comments"}
            </p>
          ) : commentsQuery.data?.comments.length ? (
            <ul className="space-y-4">
              {commentsQuery.data.comments.map((comment) => (
                <li key={comment.id} className="bg-blue-950 p-4 rounded-md">
                  <p className="font-semibold">{comment.body}</p>
                  <p className="text-sm mt-1 text-gray-400">
                    By {comment.user.username}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No comments available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default PostById;
