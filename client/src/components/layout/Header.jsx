import React, { useState, useEffect } from "react";
import { BiMenu, BiSearch, BiUser, BiShoppingBag } from "react-icons/bi";
import FullNavigationModal from "@/components/modals/FullNavigationModal";
import CartModal from "../modals/CartModal";
import { Link } from "react-router-dom";

const HeaderItem = ({ children, handleOnClick, count, className }) => {
  return (
    <button
      className={`relative text-xl sm:text-2xl lg:text-2xl text-gray-600 p-2 rounded-full hover:bg-gray-100 ${className}`}
      onClick={handleOnClick}
    >
      {children}
      {count && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 text-xs flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".sticky")) return;
      if (e.target.closest(".sidebar-fixed")) return;
      setIsCartOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center py-4 lg:py-4 px-6 sm:px-16 bg-white shadow-sm shadow-slate-100">
      <div className="flex lg:hidden items-center">
        <HeaderItem handleOnClick={() => setIsOpen(!isOpen)}>
          <BiMenu />
        </HeaderItem>
      </div>
      <div className="text-lg sm:text-xl lg:text-xl font-semibold">
        <Link to="/">Organic Farms</Link>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <input
          type="text"
          placeholder="Search for products"
          className="border border-gray-300 rounded-md px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
        <button className="bg-red-600 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </div>

      <div className="flex items-center sm:gap-2">
        <HeaderItem className="lg:hidden">
          <BiSearch />
        </HeaderItem>

        <HeaderItem>
          <BiUser />
        </HeaderItem>

        <HeaderItem count={10} handleOnClick={() => setIsCartOpen(true)}>
          <BiShoppingBag />
        </HeaderItem>
      </div>

      <FullNavigationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Header;
