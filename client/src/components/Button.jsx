import React from "react";

function Button({ children, variant = "contained", className, ...rest }) {
  return (
    <button
      className={`
        ${
          variant === "outlined"
            ? "bg-transparent border border-green-300 hover:border-green-400 text-white-600"
            : "bg-green-500 hover:bg-green-600 text-white"
        }       
       text-gray-600 text-base font-semibold w-full p-4 rounded-md ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
