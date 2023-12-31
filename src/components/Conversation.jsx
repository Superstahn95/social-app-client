import UserImage from "./UserImage";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

function Conversation({
  conversation,
  loggedInUser,
  token,
  currentChat,
  setChatMate,
}) {
  const [user, setUser] = useState(null); //take this chat mate up a level
  const getUser = async () => {
    const friendId = conversation.members.find(
      (member) => member !== loggedInUser
    );
    try {
      const response = await axiosInstance.get(`user/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  useEffect(() => {
    getUser();
  }, [conversation, loggedInUser]);
  const handleConversationClick = () => {
    setChatMate(user._id);
  };

  const imageAddress = user?.profilePicture
    ? user?.profilePicture.secure_url
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  // console.log("current chat....");
  // console.log(currentChat._id);
  // console.log(conversation._id);
  //currentChat === conversation._id
  return (
    <div
      onClick={handleConversationClick}
      className={`${
        currentChat?._id === conversation._id &&
        "bg-blue-500 dark:bg-orange-500 text-white "
      } flex items-center space-x-5 cursor-pointer mt-5 hover:bg-blue-300 dark:hover:bg-orange-300 text-xs md:text-lg`}
    >
      <UserImage image={imageAddress} />
      <span className="dark:text-white">
        {/* {user?.firstName} {user?.lastName} */}
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
}

export default Conversation;
