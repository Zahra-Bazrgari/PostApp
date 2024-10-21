import React, { useEffect, useState } from "react";
import { fetchPostComments } from "../api/comments.api";
import { IComments } from "../types/comments.type";

const CommentsReqs: React.FC = () => {
  const [comments, setComments] = useState<IComments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const response = await fetchPostComments({ postId: 1 });
        setComments(response.comments);
      } catch (err) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, []);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Comments for Post 1</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.body}</p>
              <small>
                By: {comment.user.fullName} (Likes: {comment.likes})
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default CommentsReqs;
