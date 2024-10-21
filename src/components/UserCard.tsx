import React from "react";
import { IUser } from "../types/users.type";

interface IUserCardProps {
  user: IUser;
}

export const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  return (
    <div className="shadow-md bg-blue-950 text-white rounded-xl w-full py-4 px-5">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="overflow-hidden">
          <p className="text-lg font-semibold text-text-black capitalize truncate">
            {user.username}
          </p>
          <p className="text-sm font-semibold text-gray-300 truncate">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export const UserCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-md bg-darkBlue-500 text-white rounded-xl w-full py-4 px-5">
      <div className="flex items-center gap-4">
        <div className="bg-gray-400 w-12 h-12 rounded-full min-w-12"></div>
        <div className="overflow-hidden space-y-2">
          <div className="bg-gray-400 w-24 h-4 rounded-md"></div>
          <div className="bg-gray-400 w-44 h-3 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
