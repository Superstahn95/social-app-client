import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";

function PostWidget({ post }) {
  const imageAddress =
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png";
  const postImageAddress =
    "https://cdn.pixabay.com/photo/2023/10/16/03/44/daughter-8318355_1280.jpg";
  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between py-2 ">
        <div className="flex items-center">
          <UserImage image={imageAddress} />
          <div>
            <Link
              to={"/profile/id"}
              className="font-bold text-sm cursor-pointer"
            >
              John Doe
            </Link>
            <p className=" text-sm">20 Nov, 2023</p>
          </div>
        </div>
        <button className="bg-blue-200 rounded-full p-2">
          <FaUserPlus className="text-blue-400" />
        </button>
      </div>

      <div>
        <p>Some things are better left unsaid</p>
        <img
          src={postImageAddress}
          alt=""
          className="max-h-[500px] w-full object-cover"
        />
      </div>
      {/* like and comment */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-1">
          <AiFillLike size={35} className="text-blue-500" />
          <span className="text-xs">6 likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <IoIosEye size={30} />
          <span className="text-xs">Comments</span>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default PostWidget;
