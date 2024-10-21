import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from "axios";

import { fetchPostsList } from '../api/posts.api';
import { IPost } from '../types/posts.type';
import { listsLimit } from '../api/constants/listLimit';

const PostList = () => {
  const [page, setPage] = useState(0);
  const limit = listsLimit;

  const { data, error, isLoading, isFetching, isError } = useQuery(
    ['posts', page],
    () => fetchPostsList({ limit, skip: page * limit }), 
    {
      keepPreviousData: true,
    }
  );

  const handleLoadMore = () => {
    if (data && data.posts.length < data.total) {
      setPage((prev) => prev + 1);
    }
  };

  const errorMessage = (error as AxiosError)?.response?.data?.message || 'An error occurred';

  return (
    <div>
      <h1>Posts</h1>
      
      {data?.posts.length ? (
        <ul>
          {data.posts.map((post: IPost) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}

      {isError && <div>Error: {errorMessage}</div>}

      {isLoading && <p>Loading...</p>}
      {isFetching && !isLoading && <p>Fetching more posts...</p>}

      {data && data.posts.length < data.total && !isFetching && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
