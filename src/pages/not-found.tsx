import React from "react";

import svg from "../assets/404.svg";
import { Link } from "react-router-dom";

// const PageNotFound = () => {
//   return (
//     <>
//       <div className="container mx-auto flex flex-col items-center justify-center ">
//         <img src={svg} alt="svg" className="mt-[40%] lg:mt-5 md:h-[70%] md:w-[50%]" />
//         <Link to={"/"}>
//           <button className="bg-red-400 font-medium text-2xl mt-4 text-white py-1 px-2 rounded-md hover:bg-red-500">
//             Back to Home
//           </button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default PageNotFound;

const PageNotFound: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <div className="text-center space-y-6 text-blue-950">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
        <Link
          to="/"
          className="bg-blue-950 px-6 py-3 rounded-lg text-lg font-semibold text-white"
        >
          Back to Home
        </Link>
    </main>
  );
};

export default PageNotFound;
