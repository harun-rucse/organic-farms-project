import React from "react";

function Button({ children, variant = "contained", className, ...rest }) {
  return (
    <button
      className={`
        ${
          variant === "outlined"
            ? "bg-transparent border border-red-300 hover:border-red-400 text-rose-600"
            : "bg-rose-500 hover:bg-rose-600 text-white"
        }       
       text-rose-600 text-base font-semibold w-full p-4 rounded-md ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
