import React from "react";

function CommentWidget({ comment }) {
  return (
    <div className="py-3 border-b border-gray-700 dark:border-white mb-2">
      <span className="text-[12px] font-bold text-black/60 dark:text-white/60">
        {comment.user.firstName} {comment.user.lastName}
      </span>
      <p className="text-[12px] text-black/60 dark:text-white/60">
        {comment.body}
      </p>
    </div>
  );
}

export default CommentWidget;
