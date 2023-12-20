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
  const params = useParams();
  const { auth } = useAuth();
  const token = auth?.token;
  const { id } = params;
  const getUser = async () => {
    try {
      const response = await axiosInstance.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!user) return null;
  return (
    <>
      <Navbar />
      <Container>
        <div className="block md:flex justify-center space-x-8 py-6 ">
          <div className="basis-[26%]  space-y-4">
            {/* <div className="fixed w-[26%]"> */}
            <UserWidget userId={user._id} />
            <FriendListWidget userId={user._id} />
            {/* </div> */}
          </div>
          <div className="basis-[42%] space-y-4">
            <MyPostWidget />
            <PostsWidget userId={id} isProfile />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
