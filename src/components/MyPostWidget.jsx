import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { FaImage } from "react-icons/fa";
import { addPost } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
function MyPostWidget() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const token = auth?.token;
  const user = auth?.user;

  const createPost = async () => {
    if (description.length < 1 && !image)
      return alert("You cannot submit an empty post");
    const formData = new FormData();
    if (description.length > 0) formData.append("description", description);
    if (image) formData.append("image", image);
    try {
      const response = await axiosInstance.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.post);
      dispatch(addPost(response.data.post));
    } catch (error) {
      console.log(error);
    }
  };
  const imageAddress = user.profilePicture
    ? user.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <WidgetWrapper>
      <div>
        <div className="flex space-x-1 items-center border-b border-black/40 py-2 mb-2">
          <UserImage image={imageAddress} />
          <div className="flex-1 ">
            <input
              type="text"
              className="w-full py-4 px-1 rounded-xl outline-none dark:bg-slate-900"
              placeholder="What's on your mind?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="image">
            <div className="flex items-center space-x-2">
              <FaImage />
              <span className="text-sm">Add Image</span>
            </div>
          </label>
          <input
            type="file"
            id="image"
            className="hidden sr-only"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            onClick={createPost}
            className="bg-blue-500 dark:bg-white dark:text-slate-900 rounded-xl w-[6rem] py-1 text-white"
          >
            Post
          </button>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
