import { AiOutlineLike, AiOutlineDislike, AiOutlineEye } from "react-icons/ai";
import { IPost } from "../types/posts.type";
import { IUser } from "../types/users.type";
import { Link } from "react-router-dom";

interface IPostCardProps {
  user: IUser;
  post: IPost;
  extendBody?: boolean;
}

export const PostCard: React.FC<IPostCardProps> = ({
  user,
  post,
  extendBody = false,
}) => {
  return (
    <div className="shadow-md bg-blue-950 text-white rounded-xl w-full py-4 px-5">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="overflow-hidden">
          <p className="text-lg font-semibold text-text-black  capitalize truncate">
            {user.username}
          </p>
          <p className="text-sm font-semibold text-gray-300 truncate">
            {user.email}
          </p>
        </div>
      </div>
      <p className="truncate text-lg font-semibold pt-4 pb-2 text-white">
        {post.title}
      </p>
      <p
        className={`text-justify text-sm font-medium text-gray-200 ${
          extendBody ? "" : "line-clamp-1"
        }`}
      >
        {extendBody ? post.body : post.body.slice(0, 90)}
      </p>
      <div className="flex flex-wrap pt-4 gap-3">
        {post.tags.map((tag, index) => (
          <Link key={index} to={`/posts?tag=${encodeURIComponent(tag)}`}>
            <div className="bg-slate-400 px-3 py-1 rounded-lg hover:bg-darkBlue-400 cursor-pointer text-xs font-medium text-black">
              {tag}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex pt-4 gap-x-4">
        <div className="flex items-center gap-x-1 text-gray-300">
          <AiOutlineLike className="w-5 h-5" />
          <span className="text-xs">{post.reactions.likes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-gray-300">
          <AiOutlineDislike className="w-5 h-5" />
          <span className="text-xs">{post.reactions.dislikes}</span>
        </div>
        <div className="flex items-center gap-x-1 text-gray-300">
          <AiOutlineEye className="w-5 h-5" />
          <span className="text-xs">{post.views}</span>
        </div>
      </div>
    </div>
  );
};

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="shadow-md bg-darkBlue-500 text-white rounded-xl w-full py-4 px-5">
      <div className="flex items-center gap-4">
        <div className="bg-gray-400 w-12 h-12 rounded-full min-w-12"></div>
        <div className="overflow-hidden space-y-2">
          <div className="bg-gray-400 w-24 h-4 rounded-md"></div>
          <div className="bg-gray-400 w-44 h-3 rounded-md"></div>
        </div>
      </div>
      <div className="pt-5 pb-1 overflow-hidden">
        <div className="bg-gray-400 w-72 h-4 rounded-md"></div>
      </div>
      <div className="overflow-hidden pt-2">
        <div className="bg-gray-400 w-full h-3 rounded-md"></div>
      </div>
      <div className="flex pt-4 gap-x-3">
        {[1, 2, 3].map((key) => (
          <div key={key} className="bg-gray-400 w-24 h-5 rounded-xl"></div>
        ))}
      </div>
      <div className="flex pt-4 gap-x-4">
        <div className="flex items-center gap-x-1 text-gray-400">
          <AiOutlineLike className="w-5 h-5" />
          <div className="bg-gray-400 w-5 h-3 rounded-md"></div>
        </div>
        <div className="flex items-center gap-x-1 text-gray-400">
          <AiOutlineDislike className="w-5 h-5" />
          <div className="bg-gray-400 w-5 h-3 rounded-md"></div>
        </div>
        <div className="flex items-center gap-x-1 text-gray-400">
          <AiOutlineEye className="w-5 h-5" />
          <div className="bg-gray-400 w-5 h-3 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
