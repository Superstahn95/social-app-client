import Navbar from "../components/Navbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState } from "react";
import OnlineChat from "../components/OnlineChat";

function Messenger() {
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = () => {};
  return (
    <>
      <Navbar />
      {/* messenger div first level */}
      <div className="flex h-[90vh] font-montserrat">
        {/* chat menu */}
        <div className="basis-[25%] h-full p-3">
          <input
            type="text"
            placeholder="Search friends"
            className="w-full outline-none border-b border-gray-700 p-2 dark:bg-slate-800 dark:border-white dark:text-white"
          />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
        {/* chat box */}
        <div className="basis-[50%] h-full ">
          <div className="flex flex-col p-3 h-full justify-between relative">
            <div className="h-[100%] overflow-y-scroll ">
              <Message />
              <Message mine={true} />
              <Message />
              <Message />
              <Message mine={true} />
              <Message />
              <Message />
              <Message />
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
                className="py-1 px-2 rounded-md bg-blue-500 text-white border-none dark:text-slate-900 dark:bg-white"
                onClick={handleSubmit}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        {/* Online friends  */}
        <div className="basis-[25%] h-full ">
          <div className="p-3 h-full ">
            <OnlineChat />
            <OnlineChat />
            <OnlineChat />
            <OnlineChat />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;

//  <>
//   <Topbar />
//   <div className="messenger">
//     <div className="chatMenu">
//       <div className="chatMenuWrapper">
//         <input placeholder="Search for friends" className="chatMenuInput" />
//         {conversations.map((c) => (
//           <div onClick={() => setCurrentChat(c)}>
//             <Conversation conversation={c} currentUser={user} />
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className="chatBox">
//       <div className="chatBoxWrapper">
//         {currentChat ? (
//           <>
//             <div className="chatBoxTop">
//               {messages.map((m) => (
//                 <div ref={scrollRef}>
//                   <Message message={m} own={m.sender === user._id} />
//                 </div>
//               ))}
//             </div>
//             <div className="chatBoxBottom">
//               <textarea
//                 className="chatMessageInput"
//                 placeholder="write something..."
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 value={newMessage}
//               ></textarea>
//               <button className="chatSubmitButton" onClick={handleSubmit}>
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <span className="noConversationText">
//             Open a conversation to start a chat.
//           </span>
//         )}
//       </div>
//     </div>
//     <div className="chatOnline">
//       <div className="chatOnlineWrapper">
//         <ChatOnline
//           onlineUsers={onlineUsers}
//           currentId={user._id}
//           setCurrentChat={setCurrentChat}
//         />
//       </div>
//     </div>
//   </div>
// </>
