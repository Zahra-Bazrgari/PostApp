import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";
import { fetchSingleUserById } from "../api/users.api";
import { AxiosError } from "axios";

const UserById: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));

  const userQuery = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUserById(Number(id)),
    enabled: validId,
  });

  if (!validId || userQuery.error) {
    return <Navigate to="/404" />;
  }

  if (!userQuery.isSuccess) {
    return (
      <section className="mx-auto max-w-lg w-full py-8">
        <div>Loading...</div>
      </section>
    );
  }

  const user = userQuery.data;

  return (
    <section className="mx-auto max-w-lg w-full py-8 bg-blue-950 text-white rounded-lg mt-5 p-5 container mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.username}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">{user.phone}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Birth Date:</strong> {user.birthDate}
        </p>
        <p>
          <strong>Height:</strong> {user.height} cm
        </p>
        <p>
          <strong>Weight:</strong> {user.weight} kg
        </p>
        <p>
          <strong>Blood Group:</strong> {user.bloodGroup}
        </p>
        <p>
          <strong>Eye Color:</strong> {user.eyeColor}
        </p>
        <p>
          <strong>Hair Color:</strong> {user.hair.color} ({user.hair.type})
        </p>
        <p>
          <strong>IP:</strong> {user.ip}
        </p>
        <p>
          <strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}
        </p>
      </div>
    </section>
  );
};

export default UserById;
