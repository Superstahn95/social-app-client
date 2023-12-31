import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Conversation from "./Conversation";
import { IoIosCloseCircle } from "react-icons/io";
import OnlineChat from "./OnlineChat";
function MobileChatMenu({
  showMobileMenu,
  setShowMobileMenu,
  loggedInUser,
  token,
  currentChat,
  chatMate,
  setChatMate,
  conversations,
  setCurrentChat,
  setConversations,
  onlineUsers,
}) {
  //   const [isVisible, setIsVisible] = useState(false);
  //   showMobileMenu={showMobileMenu}
  //   setShowMobileMenu={setShowMobileMenu}
  //   loggedInUser={userId}
  //   token={token}
  //   currentChat={currentChat}
  //   chatMate={chatMate}
  //   setChatMate={setChatMate}
  //   conversations={conversations}
  //   setCurrentChat={setCurrentChat}

  //for closing our mobile menu
  const toggleMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  //   className="lg:hidden"
  console.log(
    `currentChat._id in our mobile component is.... ${currentChat?._id}`
  );
  //   console.log(currentChat);
  return (
    <div className="block md:hidden">
      {/* <button
        onClick={toggleMenu}
        className="text-2xl text-black dark:text-white"
      >
        <FaBars />
      </button> */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform transition-transform ease-in-out duration-500 ${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="fixed top-0 left-0 h-full w-4/5 bg-white shadow p-4 dark:bg-slate-900">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-800 dark:text-white"
          >
            <IoIosCloseCircle />
          </button>
          {/* <ul> */}
          {/* conversations */}
          <div className=" max-h-[45%] min-h-[45%] overflow-y-scroll">
            <div className="dark:text-white font-bold text-xl">
              Conversations
            </div>
            {conversations.map((conversation) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentChat={currentChat}
                  loggedInUser={loggedInUser}
                  token={token}
                  setChatMate={setChatMate}
                  chatMate={chatMate}
                />
              </div>
            ))}
          </div>
          {/* active users */}
          <div className=" max-h-[45%] min-h-[45%] overflow-y-scroll">
            <div className="dark:text-white font-bold text-xl">
              Active Users
            </div>
            <OnlineChat
              onlineUsers={onlineUsers}
              currentId={loggedInUser}
              setCurrentChat={setCurrentChat}
              conversations={conversations}
              setConversations={setConversations}
            />
          </div>
          {/* <li>Menu Item 1</li>
            <li>Menu Item 2</li> */}
          {/* Add more menu items as needed */}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
}

export default MobileChatMenu;
