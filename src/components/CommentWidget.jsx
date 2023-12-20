import React from "react";

function CommentWidget() {
  return (
    <div className="py-3 border-b border-gray-700 dark:border-white mb-2">
      <span className="text-[12px] font-bold text-black/60 dark:text-white/60">
        {" "}
        Queen Agbai{" "}
      </span>
      <p className="text-[12px] text-black/60 dark:text-white/60">
        Nice to meet you here too. Can I add you up?{" "}
      </p>
    </div>
  );
}

export default CommentWidget;
