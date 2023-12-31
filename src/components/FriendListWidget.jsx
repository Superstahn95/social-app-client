import WidgetWrapper from "./WidgetWrapper";
import Friend from "./Friend";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { setFriends } from "../features/friend/friendSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function FriendListWidget({ userId }) {
  //get user token from state
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.friend);
  const { auth } = useAuth();
  const token = auth?.token;
  const getFriends = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userId}/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setFriends(response.data.friends));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <WidgetWrapper>
      <h3 className="mb-2">Friend List</h3>
      {friends?.length < 1 ? (
        <h2 className="dark:text-white">No Friends yet</h2>
      ) : (
        friends?.map((friend) => <Friend friend={friend} />)
      )}
      {/* {friends?.map((friend) => (
        <Friend />
      ))} */}
    </WidgetWrapper>
  );
}

export default FriendListWidget;
