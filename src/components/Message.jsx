import React from "react";
// {mine ? "message own" : "message"}
function Message({ message, mine }) {
  const demoImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className={`flex flex-col mt-5  ${mine && "items-end"}`}>
      <div className="flex space-x-2">
        <img
          className="w-[32px] h-[32px] rounded-[50%]"
          src={demoImage}
          alt=""
        />
        <p
          className={`${
            mine
              ? "bg-blue-500 text-white dark:bg-slate-700"
              : " bg-slate-200 dark:text-white dark:bg-slate-800"
          } p-3 rounded-md  max-w-[300px]`}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          dolore perspiciatis fugiat quam, ipsam aperiam doloribus tempore,
          corpo
        </p>
      </div>
      <div className="text-xs mt-3 dark:text-white">25mins ago</div>
    </div>
  );
}

export default Message;
