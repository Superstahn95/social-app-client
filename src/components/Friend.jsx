import UserImage from "./UserImage";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
function Friend({ friend }) {
  const imageAddress =
    "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg";
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <UserImage image={imageAddress} />
        <div>
          <p className=" text-sm">Unknown User</p>
          <p className=" text-sm">0 friends</p>
        </div>
      </div>
      <button className="bg-blue-200 rounded-full p-2">
        <FaUserMinus className="text-blue-400" />
      </button>
    </div>
  );
}

export default Friend;
