import React from "react";

function UserImage({ image, size = "60px" }) {
  //   const height = size;
  //   const width = size;
  return (
    <div className=" h-[60px] w-[60px]">
      <img
        src={image}
        alt="user"
        className="h-[60px] w-[60px] rounded-[50%] object-cover"
      />
    </div>
  );
}

export default UserImage;
