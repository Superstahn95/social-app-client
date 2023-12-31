import { useEffect, useState } from "react";
import { format } from "timeago.js";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

function Message({ message, mine, currentChatMate }) {
  const imageAddress = currentChatMate?.profilePicture
    ? currentChatMate?.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className={`flex flex-col mt-5  ${mine && "items-end"}`}>
      <div className="flex space-x-2">
        {!mine && (
          <img
            className="w-[32px] h-[32px] rounded-[50%]"
            src={imageAddress}
            alt="dp"
          />
        )}
        {/* bg-slate-700 */}
        <p
          className={`${
            mine
              ? "bg-blue-500 text-white dark:bg-orange-500"
              : " bg-slate-200 dark:text-white dark:bg-slate-800"
          } p-3 rounded-md  max-w-[300px] text-xs md:text-sm`}
        >
          {message.text}
        </p>
      </div>
      <div className="text-[10px] mt-3 dark:text-white">
        {format(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
