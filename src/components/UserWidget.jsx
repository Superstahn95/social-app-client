import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

function UserWidget({ userId }) {
  const { auth } = useAuth();
  const token = auth?.token;

  const [user, setUser] = useState(null);
  console.log(auth?.user);
  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Getting user.....");
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(user);
  const imageAddress = user?.profilePicture
    ? user?.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between py-2 border-b border-black/40 dark:text-white">
        <Link to={"/profile/id"} className="flex items-center cursor-pointer">
          <UserImage image={imageAddress} />
          <div>
            <p className="font-bold text-lg">{user?.firstName}</p>
            <p className=" text-sm">{user?.friends.length} friends</p>
          </div>
        </Link>
        <button>Add</button>
      </div>
      <div className="flex-col justify-center space-y-3  py-2 border-b border-black/40 dark:text-white">
        <div className="flex items-center space-x-1">
          <IoLocationOutline />
          <p className=" text-sm capitalize">{user?.location}</p>
        </div>
        <div className="flex items-center space-x-1">
          <GoBriefcase />
          <p className=" text-sm capitalize">{user?.occupation}</p>
        </div>
      </div>

      <div className="flex-col justify-center space-y-3  py-2 border-b border-black/40 dark:text-white">
        <div className="flex justify-between items-center ">
          <p className=" text-sm">Profile views</p>
          <span>3563</span>
        </div>
        <div className="flex justify-between items-center dark:text-white">
          <p className=" text-sm">Post impressions</p>
          <span>5243</span>
        </div>
      </div>

      {/* social links */}
      <div className="flex-col justify-center space-y-3  py-2 border-b border-black/40 mb-1 dark:text-white">
        <p className="font-bold text-lg">Social Profiles</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaTwitter className="text-blue-500 dark:text-white" />
            <div>
              <p className="font-semibold text-sm">Twitter</p>
              <p className=" text-sm">Not added</p>
            </div>
          </div>
          <button>
            <FaRegPenToSquare />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-blue-500 dark:text-white" />
            <div>
              <p className="font-semibold text-sm">LinkedIn</p>
              <p className=" text-sm">Not added</p>
            </div>
          </div>
          <button>
            <FaRegPenToSquare />
          </button>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default UserWidget;
