import React from "react";

function WidgetWrapper({ children }) {
  return (
    <div className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 font-montserrat dark:text-white">
      {children}
    </div>
  );
}

export default WidgetWrapper;
