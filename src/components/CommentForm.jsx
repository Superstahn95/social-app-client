import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { commentOnPost } from "../features/post/postSlice";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";

function CommentForm({ postId }) {
  const [commentBody, setCommentBody] = useState("");
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const token = auth?.token;
  const placeComment = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `/comment/${postId}`,
        { body: commentBody },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      //pass in post id and comment

      dispatch(
        commentOnPost({ comment: response.data.comment, postId: postId })
      );
      setCommentBody("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={placeComment} className="space-y-1">
      <input
        type="text"
        className="border border-gray-500 outline-none p-2 w-full text-xs rounded-md dark:text-white dark:bg-slate-900"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
      />
      <div className=" flex justify-end">
        <button
          type="submit"
          className="rounded-md px-2 py-1 ml-[14rem] bg-blue-500 text-white dark:text-slate-900 dark:bg-white "
        >
          Place Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
