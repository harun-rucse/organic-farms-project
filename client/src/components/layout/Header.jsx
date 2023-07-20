import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiMenu, BiUser, BiShoppingBag } from "react-icons/bi";
import FullNavigationModal from "@/components/modals/FullNavigationModal";
import CartModal from "@/components/modals/CartModal";
import { useGetProfileQuery } from "@/store/apiSlices/authApiSlice";
import { removeToken } from "@/store/reducers/authReducer";

const HeaderItem = ({ children, handleOnClick, count, className }) => {
  return (
    <button
      className={`relative text-xl sm:text-2xl lg:text-2xl text-gray-600 p-2 rounded-full hover:bg-gray-100 ${className}`}
      onClick={handleOnClick}
    >
      {children}
      {count && (
        <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 text-xs flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

const SearchItem = ({ item }) => {
  const { name, images, inStock, price, subcategory } = item;

  return (
    <Link
      to={`/products/${item._id}`}
      className="flex items-center gap-2 border-b border-gray-100 py-4 px-2 lg:px-6 hover:bg-gray-50"
    >
      <img
        src={images && images[0]}
        alt={name}
        className="w-12 h-12 object-contain"
      />
      <div className="flex flex-col gap-1">
        <p className={"text-sm lg:text-base font-semibold"}>{`${name} (${
          inStock ? "In Stock" : "Out of Stock"
        })`}</p>
        <div className="flex gap-2 lg:gap-4 items-center">
          <strong className="text-xs text-gray-600">Price: {price}</strong>
          <p className="text-xs">
            Category:
            <strong className="ml-2">{`${subcategory?.category?.name} (${subcategory?.name})`}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
};

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: profile } = useGetProfileQuery();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".sticky")) return;
      if (e.target.closest(".sidebar-fixed")) return;
      setIsCartOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    dispatch(removeToken());
    window.location.reload();
  };

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);

    console.log(searchQuery);

    // call api after 500ms of user stop typing
    setTimeout(async () => {
      if (searchQuery.length <= 1) {
        setShowSearchResults(false);
        setSearchResults([]);
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/products/search/?name=${searchQuery}`
      );
      const data = await res.json();
      setSearchResults(data);
      setShowSearchResults(true);

      return () => clearTimeout();
    }, 500);
  };

  return (
    <div className="w-full sticky top-0 z-50 flex flex-col gap-3 py-4 lg:py-4 px-6 sm:px-16 bg-white shadow-sm shadow-slate-100">
      <div className="flex w-full justify-between items-center">
        <div className="flex lg:hidden items-center">
          <HeaderItem handleOnClick={() => setIsOpen(!isOpen)}>
            <BiMenu />
          </HeaderItem>
        </div>
        <div className="text-lg sm:text-xl lg:text-xl font-semibold">
          <Link to="/">Organic Farms</Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 relative">
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-[12rem] sm:w-[24rem] lg:w-[32rem] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Search dropdow with search item */}
          <div
            className={`${
              !showSearchResults && "hidden"
            } absolute top-11 left-0 w-full bg-white shadow-lg rounded-lg z-50 overflow-y-auto max-h-[35rem]`}
          >
            {searchResults?.result?.length > 0 ? (
              searchResults?.result?.map((item) => (
                <SearchItem key={item._id} item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center py-4">
                <p className="text-gray-500">No results found</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center sm:gap-2">
          {profile ? (
            <button
              className="text-gray-800 hover:text-rose-600 hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-800 hover:text-rose-600 hover:underline"
            >
              Login
            </Link>
          )}

          <HeaderItem>
            <BiUser onClick={() => navigate("/profile")} />
          </HeaderItem>

          <HeaderItem
            count={cartItems?.length || false}
            handleOnClick={() => setIsCartOpen(true)}
          >
            <BiShoppingBag />
          </HeaderItem>
        </div>
      </div>
      <div className="flex lg:hidden items-center gap-4 w-full relative">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />

        {/* Search dropdow with search item */}
        <div
          className={`${
            !showSearchResults && "hidden"
          } absolute top-11 left-0 w-full bg-white shadow-lg rounded-lg z-50 overflow-y-auto max-h-[35rem]`}
        >
          {searchResults?.result?.length > 0 ? (
            searchResults?.result?.map((item) => (
              <SearchItem key={item._id} item={item} />
            ))
          ) : (
            <div className="flex items-center justify-center py-4">
              <p className="text-gray-500">No results found</p>
            </div>
          )}
        </div>
      </div>

      <FullNavigationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Header;
