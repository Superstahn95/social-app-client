import UserImage from "./UserImage";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../features/friend/friendSlice";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

function Friend({ friend }) {
  const altImageAddress =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const { auth } = useAuth();
  const token = auth?.token;
  const loggedInUser = auth?.user._id;
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friend);
  const isFriend = friends?.find((person) => person._id === friend._id);
  const addOrRemoveFriend = async () => {
    try {
      const response = await axiosInstance.patch(
        `/user/${loggedInUser}/${friend._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(setFriends(response.data.friends));
    } catch (error) {
      console.log(error);
    }
  };
  const profilePicture = friend?.profilePicture
    ? friend.profilePicture.secure_url
    : altImageAddress;
  console.log(friend);
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <UserImage image={profilePicture} />
        <div>
          <p className=" text-sm">{`${friend.firstName} ${friend.lastName}`}</p>
          <p className=" text-sm">{friend.location}</p>
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
  );
}

export default Friend;
