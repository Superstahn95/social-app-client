import WidgetWrapper from "./WidgetWrapper";
import UserImage from "./UserImage";
import { IoLocationOutline } from "react-icons/io5";
import { GoBriefcase } from "react-icons/go";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";

function UserWidget() {
  const imageAddress =
    "https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png";
  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between py-2 border-b border-black/40 dark:text-white">
        <Link to={"/profile/id"} className="flex items-center cursor-pointer">
          <UserImage image={imageAddress} />
          <div>
            <p className="font-bold text-lg">Unknown User</p>
            <p className=" text-sm">0 friends</p>
          </div>
        </Link>
        <button>Add</button>
      </div>
      <div className="flex-col justify-center space-y-3  py-2 border-b border-black/40 dark:text-white">
        <div className="flex items-center space-x-1">
          <IoLocationOutline />
          <p className=" text-sm">Your location</p>
        </div>
        <div className="flex items-center space-x-1">
          <GoBriefcase />
          <p className=" text-sm">Your occupation</p>
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
