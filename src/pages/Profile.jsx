import { useParams } from "react-router-dom";
import UserWidget from "../components/UserWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import FriendListWidget from "../components/FriendListWidget";

function Profile() {
  const params = useParams();
  return (
    <>
      <Navbar />
      <Container>
        <div className="block md:flex justify-center space-x-8 py-6 ">
          <div className="basis-[26%]  space-y-4">
            {/* <div className="fixed w-[26%]"> */}
            <UserWidget />
            <FriendListWidget />
            {/* </div> */}
          </div>
          <div className="basis-[42%] space-y-4">
            <MyPostWidget />
            <PostsWidget />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
