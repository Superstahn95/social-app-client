import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: null,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

export const { setFriends } = friendSlice.actions;

export default friendSlice.reducer;
