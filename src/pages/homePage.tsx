import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <main className="h-screen bg-blue-950 flex flex-col gap-5 items-center justify-center text-white">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold">Welcome to Our Website!</h1>
        <p className="text-lg">
          We are glad to have you here. Explore our content or check out the
          latest posts.
        </p>
      </div>
      
        <Link
          to="/posts"
          className="bg-white text-blue-950 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          View Posts
        </Link>

    </main>
  );
};
