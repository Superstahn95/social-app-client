import Container from "../components/Container";
import Navbar from "../components/Navbar";
import UserWidget from "../components/UserWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import AdvertWidget from "../components/AdvertWidget";
import FriendListWidget from "../components/FriendListWidget";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";

function Home() {
  const { auth } = useAuth();
  // const userId = auth?.user._id;

  return (
    <>
      <Navbar />
      <Container>
        <div className="block md:flex justify-between py-6">
          <div className="basis-[26%]">
            <UserWidget userId={auth?.user._id} />
          </div>
          <div className="basis-[42%]  space-y-5">
            <MyPostWidget />
            <PostsWidget />
          </div>
          <div className="basis-[26%]">
            <AdvertWidget />
            <div className="mt-2">
              <FriendListWidget userId={auth?.user._id} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
