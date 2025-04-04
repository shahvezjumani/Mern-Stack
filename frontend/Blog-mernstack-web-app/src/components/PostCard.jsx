import React from "react";
import { Link } from "react-router-dom";

function PostCard({ _id, title, featuredImage }) {
  return (
    <Link to={`/post/${_id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 w-[300px]">
        <div className="w-full justify-center mb-4">
          <img src={featuredImage} alt={title} className="rounded-xl" width={200}/>
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <h2 className="text-black">{_id}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
