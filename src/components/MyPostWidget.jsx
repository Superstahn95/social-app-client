import React, { useState, useEffect } from "react";
import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { FaImage } from "react-icons/fa";
import { addPost } from "../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { IoIosCloseCircle } from "react-icons/io";
function MyPostWidget() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const token = auth?.token;
  const user = auth?.user;
  //   const file = e.target.files[0];
  //   if (!file.type.includes("image")) {
  //     return alert("This is not an image");
  //   }
  //   setPostData({ ...postData, image: file });
  //   return setSelectedThumbnailUrl(URL.createObjectURL(file));
  // }

  const createPost = async () => {
    if (description.length < 1 && !image)
      return alert("You cannot submit an empty post");
    const formData = new FormData();
    if (description.length > 0) formData.append("description", description);
    if (image) formData.append("image", image);
    setLoading(true);
    try {
      const response = await axiosInstance.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addPost(response.data.post));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const removeImage = () => {
    setImage(null);
    setSelectedImageUrl("");
  };
  const imageAddress = user.profilePicture
    ? user.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    if (image) {
      setSelectedImageUrl(URL.createObjectURL(image));
    }
  }, [image]);
  return (
    <div className="mt-5 md:mt-0">
      <WidgetWrapper>
        <div className="">
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
              // onChange={(e) => setImage(e.target.files[0])}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              onClick={createPost}
              disabled={loading}
              className="bg-blue-500 dark:bg-orange-500 dark:text-white rounded-xl w-[6rem] py-1 text-white"
            >
              {loading ? "Loading..." : " Post"}
            </button>
          </div>
          {selectedImageUrl && (
            <div className="mt-4 border border-dashed dark:border-white border-gray-700 text-3xl ">
              <div className="relative w-[100px] h-[150px] my-2">
                <img
                  src={selectedImageUrl}
                  alt=""
                  className="w-[100px] h-[150px] object-cover"
                />
                <button
                  className="absolute top-0 right-0 z-10"
                  onClick={removeImage}
                >
                  <IoIosCloseCircle size={20} className="text-white" />
                </button>
                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
              </div>
            </div>
          )}
        </div>
      </WidgetWrapper>
    </div>
  );
}

export default MyPostWidget;
