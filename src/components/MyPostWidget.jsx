import React from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { FaImage } from "react-icons/fa";

function MyPostWidget() {
  const imageAddress =
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png";
  return (
    <WidgetWrapper>
      <div>
        <div className="flex space-x-1 items-center border-b border-black/40 py-2 mb-2">
          <UserImage image={imageAddress} />
          <div className="flex-1 ">
            <input
              type="text"
              className="w-full py-4 px-1 rounded-xl outline-none "
              placeholder="What's on your mind?"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaImage />
            <span className="text-sm">Add Image</span>
          </div>

          <button className="bg-blue-500 rounded-xl w-[6rem] py-1 text-white">
            Post
          </button>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
