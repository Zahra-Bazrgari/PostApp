import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../api/users.api";
import { UserCard, UserCardSkeleton } from "../components/UserCard";
import { AxiosError } from "axios";
import { IUser } from "../types/users.type";

export const UsersPage: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<IUser[]>([]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const limit = 8; 

  const { data: userData, error, isLoading, isFetching, isError } = useQuery(
    ["users", page],
    () => fetchAllUsers(page, limit),
    {
      keepPreviousData: true,
    }
  );

  const errorMessage =
    (error as AxiosError)?.response?.data?.message || "An error occurred";

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(true);
  };

  useEffect(() => {
    if (userData) {
      setData((prevData) => [...prevData, ...userData]); 
      setLoadingMore(false);
    }
  }, [userData]);

  return (
    <main className="min-h-screen w-full bg-darkBlue-600 px-4 text-white container mx-auto">
      <section className="mx-auto max-w-lg w-full grid grid-cols-1 gap-y-6 py-10 text-white">
        {data.map((user, index) => (
          <Link key={index} to={`/users/${user.id}`}>
            <UserCard user={user} />
          </Link>
        ))}

        {(isLoading || isFetching || loadingMore) && (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        )}

        {isError && <div>Error: {errorMessage}</div>}

        {userData && userData.length === limit && !isFetching && (
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
