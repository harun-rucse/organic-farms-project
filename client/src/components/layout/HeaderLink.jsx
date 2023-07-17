import { Link } from "react-router-dom";

function HeaderLink() {
  return (
    <div className="w-full bg-white shadow-md p-4 text-sm">
      <div className="container flex items-center justify-end gap-8">
        <Link
          to="/"
          className="text-gray-600 font-medium hover:text-green-600 hover:underline"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="text-gray-600 font-medium hover:text-green-600 hover:underline"
        >
          Shop
        </Link>
        <Link
          to="/branches"
          className="text-gray-600 font-medium hover:text-green-600 hover:underline"
        >
          Branch
        </Link>
      </div>
    </div>
  );
}

export default HeaderLink;
