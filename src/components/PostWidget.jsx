import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { updatePost } from "../features/post/postSlice";
import { setFriends } from "../features/friend/friendSlice";
import CommentWidget from "./CommentWidget";

function PostWidget({ post }) {
  const { _id, description, comments, likes, image, userId, createdAt } = post;

  const [isComments, setIsComments] = useState(false);
  const { friends } = useSelector((state) => state.friend);
  const isFriend = friends?.find((person) => person._id === post.userId._id);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const token = auth?.token;
  const loggedInUserId = auth?.user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const imageAddress = userId.profilePicture
    ? userId.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //function for liking and unliking post
  const likeAndUnlikePost = async () => {
    try {
      const response = await axiosInstance.patch(
        `/post/${_id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updatePost(response.data.post));
    } catch (error) {
      console.log(error);
    }
  };
  const addOrRemoveFriend = async () => {
    try {
      const response = await axiosInstance.patch(
        `/user/${loggedInUserId}/${post.userId._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      //dispatch action to set friends here
      dispatch(setFriends(response.data.friends));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between py-2 ">
        <div className="flex items-center">
          <UserImage image={imageAddress} />
          <div>
            <Link
              to={`/profile/${userId._id}`}
              className="font-bold text-sm cursor-pointer"
            >
              {userId.firstName} {userId.lastName}
            </Link>
            <p className=" text-sm">20 Nov, 2023</p>
          </div>
        </div>
        <button
          onClick={addOrRemoveFriend}
          className="bg-blue-200 rounded-full p-2"
        >
          {isFriend ? (
            <FaUserMinus className="text-blue-400" />
          ) : (
            <FaUserPlus className="text-blue-400" />
          )}
        </button>
      </div>

      <div>
        <p>{description}</p>
        {image && (
          <img
            src={image.url}
            alt="upload"
            className="max-h-[500px] w-full object-cover"
          />
        )}
      </div>
      {/* like and comment */}
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-1">
          <button onClick={likeAndUnlikePost}>
            {isLiked ? (
              <AiFillLike size={35} className="text-blue-500" />
            ) : (
              <AiOutlineLike size={35} className="text-blue-500" />
            )}
          </button>
          <span className="text-xs">{likeCount} likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={() => setIsComments((prev) => !prev)}>
            {isComments ? <IoIosEyeOff size={30} /> : <IoIosEye size={30} />}
          </button>

          <span className="text-xs">Comments</span>
        </div>
      </div>
      {/* comment field  */}
      {isComments && (
        <div className="mt-2">
          <CommentWidget />
          <CommentWidget />
          <CommentWidget />
          <form action="" className="space-y-1">
            <input
              type="text"
              className="border border-gray-500 outline-none p-2 w-full rounded-md dark:text-white dark:bg-slate-900"
            />
            <div className=" flex justify-end">
              <button
                type="submit"
                className="rounded-md px-2 py-1 ml-[14rem] bg-blue-500 text-white dark:text-slate-900 dark:bg-white "
              >
                Place Comment
              </button>
            </div>
          </form>
        </div>
      )}
    </WidgetWrapper>
  );
}
// {likeCount}
export default PostWidget;
