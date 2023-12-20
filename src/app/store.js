import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import friendReducer from "../features/friend/friendSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
    friend: friendReducer,
  },
});

export default store;
