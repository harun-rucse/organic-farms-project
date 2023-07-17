import React from "react";
import { createPortal } from "react-dom";
import { ImSpinner3 } from "react-icons/im";

function Loader() {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100/70 flex justify-center items-center z-50">
      <div className="flex items-center gap-2">
        <ImSpinner3 className="animate-spin text-2xl text-gray-500" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>,
    document.getElementById("loader-root")
  );
}

export default Loader;
