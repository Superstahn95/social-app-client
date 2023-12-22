function OnlineChat({ onlineUsers, currentId, setCurrentChat }) {
  const demoImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className="chatOnline">
      <div className="flex items-center cursor-pointer mt-3 dark:text-white">
        <div className="relative mr-3">
          <img
            className="w-[40px] h-[40px] rounded-[50%] object-cover"
            src={demoImage}
            alt=""
          />
          <div className="w-[10px] h-[10px] rounded-[50%] bg-green-500 absolute top-1 right-1"></div>
        </div>
        <span className="chatOnlineName">Stanley Chukwuemeka</span>
      </div>
    </div>
  );
}

export default OnlineChat;
