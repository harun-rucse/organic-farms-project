import React from "react";
import { Link } from "react-router-dom";

function ProfileTopbar({ icon: Icon, title, link, linkText }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Icon className="inline-block text-2xl text-red-600" />
        <p className="text-xl md:text-2xl font-semibold">{title}</p>
      </div>
      <Link
        to={link}
        className="bg-pink-100 px-6 py-2 rounded-md text-sm md:text-base text-rose-600 font-semibold"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default ProfileTopbar;
