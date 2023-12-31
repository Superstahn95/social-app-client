import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useRef } from "react";
import OnlineChat from "../components/OnlineChat";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import { io } from "socket.io-client";
import UserImage from "../components/UserImage";
import MobileChatMenu from "../components/MobileChatMenu";
import { FaBars } from "react-icons/fa";

function Messenger() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatMate, setChatMate] = useState(null);
  const [currentChatMate, setCurrentChatMate] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { auth } = useAuth();
  const token = auth?.token;
  const userId = auth?.user._id;
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    socket.current = io("http://localhost:3001");

    socket.current.on("getMessage", ({ text, senderId }) => {
      setIncomingMessage({
        text,
        senderId,
        createdAt: Date.now(),
      });
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = async () => {
    if (newMessage === "") return alert("You cannot send an empty message");
    const message = {
      text: newMessage,
      sender: userId,
      conversationId: currentChat._id,
    };

    //send message to socket containing the senderId, receiverId and the text
    const receiverId = currentChat?.members.find((member) => member !== userId);
    socket.current.emit("sendMessage", {
      text: newMessage,
      senderId: userId,
      receiverId,
    });

    try {
      const response = await axiosInstance.post(`message`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages([...messages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  //get conversations of logged in user
  const getConversations = async () => {
    try {
      //should be changed to getting the token via token recognition
      const response = await axiosInstance.get(`/conversation/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConversations(response.data.conversation);
    } catch (error) {
      console.log(error);
    }
  };
  const getMessages = async () => {
    try {
      //need to send in the conversation id
      console.log(
        `we are about getting the messages with this currentChat id ....${currentChat._id}`
      );
      const response = await axiosInstance.get(`/message/${currentChat?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages);
      console.log("My messages....");
      console.log(messages);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCurrentChatMate = async () => {
    try {
      const response = await axiosInstance.get(`user/${chatMate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentChatMate(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleMenu = () => {
    setShowMobileMenu((prevState) => !prevState);
  };
  useEffect(() => {
    incomingMessage &&
      currentChat?.members.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, currentChat]);
  useEffect(() => {
    getConversations();
  }, [userId]);
  //get messages based on current chat id
  useEffect(() => {
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  useEffect(() => {
    fetchCurrentChatMate();
  }, [chatMate]);
  //add user to socket
  useEffect(() => {
    //on mount, i wish to send the userId to our backend to be added to the socket
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      //the users is an array of object with userId and socketId properties
      setOnlineUsers(users.filter((user) => user.userId !== userId));
    });
  }, [userId]);

  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //current currentChatMate seems to be changing
  return (
    <>
      <Navbar />
      {/* messenger div first level */}
      <div className="flex h-[90vh] font-montserrat">
        {/* chat menu */}
        <div className=" hidden md:block md:basis-[25%] h-full p-3">
          <p className="font-semibold text-xl mb-3 dark:text-white">
            Conversations
          </p>
          {conversations?.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation
                key={conversation._id}
                conversation={conversation}
                loggedInUser={userId}
                token={token}
                currentChat={currentChat}
                chatMate={chatMate}
                setChatMate={setChatMate}
              />
            </div>
          ))}
        </div>
        {/* to be displayed on mobile */}
        {/* <div className="absolute top-[80px] bottom-0 w-[40%] bg-red-500 z-[99]"></div> */}
        <MobileChatMenu
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          loggedInUser={userId}
          token={token}
          currentChat={currentChat}
          chatMate={chatMate}
          setChatMate={setChatMate}
          conversations={conversations}
          setCurrentChat={setCurrentChat}
          onlineUsers={onlineUsers}
          setConversations={setConversations}
        />

        {/* chat box */}
        <div className="w-full md:basis-[50%] h-full  md:shadow-md border-gray-500">
          <div className="flex flex-col p-3 h-full justify-between relative ">
            {currentChat ? (
              <>
                <div className="h-[100%] overflow-y-scroll relative ">
                  <div className="sticky top-0 left-0 w-full py-2 bg-slate-100 md:shadow-md dark:bg-slate-700 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        className="w-[32px] h-[32px] rounded-[50%]"
                        src={
                          currentChatMate?.profilePicture
                            ? currentChatMate.profilePicture.secure_url
                            : altImage
                        }
                        alt="dp"
                      />
                      <span className="capitalize dark:text-white font-bold">
                        {currentChatMate?.firstName} {currentChatMate?.lastName}
                      </span>
                    </div>
                    {/* button for toggle will be here */}
                    <button
                      onClick={toggleMenu}
                      className="text-2xl text-black dark:text-white md:hidden"
                    >
                      <FaBars />
                    </button>
                  </div>
                  {messages.map((message) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          key={message._id}
                          message={message}
                          mine={message.sender === userId}
                          currentChat={currentChat}
                          sender={message.sender}
                          currentChatMate={currentChatMate}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* textarea */}
                <div className="mt-[5px] flex items-center  justify-between space-x-3">
                  <textarea
                    className="flex-1 h-[80px] p-2 outline-none rounded-md border border-gray-700 dark:border-white dark:bg-slate-800 dark:text-white"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="py-1 px-2 rounded-md bg-blue-500 text-white border-none dark:text-slate-900 dark:bg-orange-500"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center  h-full space-y-4 md:justify-center">
                <p className=" text-[20px] md:text-[40px] text-center dark:text-white mt-10 md:mt-0">
                  Click on a conversation or an active user to start a chat
                </p>

                <button
                  onClick={toggleMenu}
                  className="p-1 dark:text-white rounded-md bg-blue-500 text-white dark:bg-orange-500 md:hidden"
                >
                  View Conversations and active users
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Online friends  */}
        <div className="hidden basis-[1] md:basis-[25%] md:block h-full ">
          <div className="p-3 h-full ">
            <p className="font-semibold text-xl mb-3 dark:text-white">
              Active Users
            </p>
            <OnlineChat
              onlineUsers={onlineUsers}
              currentId={userId}
              setCurrentChat={setCurrentChat}
              conversations={conversations}
              setConversations={setConversations}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
