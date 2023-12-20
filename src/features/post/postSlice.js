import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      const updatedPosts = [action.payload, ...state.posts];
      state.posts = updatedPosts;
    },
    updatePost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { getPosts, addPost, updatePost } = postSlice.actions;

export default postSlice.reducer;
