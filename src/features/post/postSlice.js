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
    commentOnPost: (state, action) => {
      const { postId, comment } = action.payload;
      //go through the posts and push the returned comment into the array of the post with the id
      const post = state.posts.find((post) => post._id === postId);
      console.log("This is our post being commented on.....");
      console.log(post);
      if (post) {
        post.comments.unshift(comment);
      }
      console.log("reviewing states....");
      console.log(JSON.parse(JSON.stringify(state.posts)));
    },
  },
});

export const { getPosts, addPost, updatePost, commentOnPost } =
  postSlice.actions;

export default postSlice.reducer;
