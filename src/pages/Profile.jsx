import { useParams } from "react-router-dom";
import UserWidget from "../components/UserWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import FriendListWidget from "../components/FriendListWidget";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { auth } = useAuth();
  const token = auth?.token;
  const { id } = params;
  console.log(`Id in the profile component...${id}`);
  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  // if (!user) return null;
  return (
    <>
      <Navbar />
      <Container>
        <div className="block md:flex justify-center space-y-3 md:space-y-0 md:space-x-8 py-6 ">
          <div className="basis-[26%] space-y-2  md:space-y-4">
            {/* <div className="fixed w-[26%]"> */}
            <UserWidget userId={id} />
            <FriendListWidget userId={user?._id} />
            {/* </div> */}
          </div>
          <div className=" md:basis-[42%] space-y-4 ">
            {/* <MyPostWidget /> */}
            <div className=" font-montserrat font-bold text-xl dark:text-white">
              {user?.firstName}'s posts
            </div>
            <PostsWidget userId={id} isProfile />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
