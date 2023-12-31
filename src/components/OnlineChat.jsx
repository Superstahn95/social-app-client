import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Friend from "./Friend";

function OnlineChat({
  onlineUsers,
  currentId,
  setCurrentChat,
  conversations,
  setConversations,
  setFriendId,
}) {
  //onlineUsers is an array fo objects
  const [activeUsers, setActiveUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const token = auth?.token;
  const loggedInUser = auth?.user._id;
  const getUsers = async () => {
    try {
      const response = await axiosInstance.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  const createConversation = async (receiverId) => {
    try {
      const response = await axiosInstance.post(
        "/conversation",
        {
          senderId: loggedInUser,
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversations((prevState) => [
        ...prevState,
        response.data.conversation,
      ]);
      setCurrentChat(response.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };
  const getConversation = async (receiverId) => {
    try {
      const response = await axiosInstance.get(
        `/conversation/${loggedInUser}/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentChat(response.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [currentId]);
  useEffect(() => {
    setActiveUsers(
      users.filter((user) =>
        onlineUsers.some((onlineUser) => onlineUser.userId === user._id)
      )
    );
  }, [users, onlineUsers]);

  const demoImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="chatOnline">
      {activeUsers.map((user) => (
        <div
          className="flex items-center cursor-pointer mt-3 dark:text-white"
          onClick={() => {
            if (
              conversations.some((conversation) =>
                conversation.members.includes(user._id)
              )
            ) {
              getConversation(user._id);
            } else {
              createConversation(user._id);
            }
          }}
        >
          <div className="relative mr-3">
            <img
              className="w-[40px] h-[40px] rounded-[50%] object-cover"
              src={
                user?.profilePicture
                  ? user.profilePicture.secure_url
                  : demoImage
              }
              alt="profile picture"
            />
            <div className="w-[10px] h-[10px] rounded-[50%] bg-green-500 absolute top-1 right-1"></div>
          </div>
          <span className="chatOnlineName">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      ))}
    </div>
  );
}

export default OnlineChat;
