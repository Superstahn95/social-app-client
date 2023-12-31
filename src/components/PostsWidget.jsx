import React, { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import { getPosts } from "../features/post/postSlice";
function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { auth } = useAuth();
  const token = auth?.token;

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getPosts(response.data.posts));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserPosts = async () => {
    try {
      const response = await axiosInstance.get(`/post/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(getPosts(response.data.posts));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      fetchUserPosts();
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <>
      {posts?.map((post) => (
        <PostWidget key={post._id} post={post} />
      ))}
    </>
  );
}

export default PostsWidget;
