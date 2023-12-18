import React from "react";

function WidgetWrapper({ children }) {
  return (
    <div className="p-2 rounded-xl bg-slate-200 font-montserrat">
      {children}
    </div>
  );
}

export default WidgetWrapper;
