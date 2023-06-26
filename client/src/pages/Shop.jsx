import React, { useState, useEffect } from "react";
import { BsFillGrid3X3GapFill, BsFilter } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import Layout from "@/components/layout";
import ShopFilter from "@/components/shop/ShopFilter";
import ProductCard from "@/components/ProductCard";
import FilterModal from "@/components/modals/FilterModal";
import { items } from "@/mock/products";
import { items as categories } from "@/mock/categories";

function Shop() {
  const [view, setView] = useState("grid");
  const [isOpen, setIsOpen] = useState(false);

  // setIsOpen false when user click main content
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".shop-page")) return;
      if (e.target.closest(".filter-modal")) return;
      setIsOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <Layout>
      <div className="shop-page bg-white flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between px-8 py-4 rounded-lg shadow-sm w-full md:h-16 mb-6">
        <h4 className="text-lg font-semibold text-gray-700">Shop</h4>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4 text-sm">
            <p>Sort By:</p>
            <select className="min-w-[10rem] border border-gray-300 px-6 py-2 text-xs rounded-md focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <option value="price">Price Low to High</option>
              <option value="price">Price Righ to Low</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <p>View:</p>
            <div className="flex items-center gap-4">
              <BsFillGrid3X3GapFill
                size={18}
                className={`${
                  view === "grid" ? "text-rose-600" : "text-gray-600"
                } cursor-pointer`}
                onClick={() => setView("grid")}
              />
              <FaThList
                size={18}
                className={`${
                  view === "list" ? "text-rose-600" : "text-gray-600"
                } cursor-pointer`}
                onClick={() => setView("list")}
              />

              <BsFilter
                size={22}
                className="text-gray-600 cursor-pointer xl:hidden"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-6">
        <ShopFilter />

        <div className="flex-1 flex flex-col gap-4">
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <ProductCard key={item._id} item={item} view="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <ProductCard key={item._id} item={item} view="list" />
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 mt-6 text-gray-700 text-sm font-medium overflow-hidden">
            <button className="w-8 h-8 px-6 flex justify-center items-center border border-gray-300 rounded-md">
              Prev
            </button>
            <p className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded-md bg-gray-200">
              1
            </p>

            <button className="w-8 h-8 px-6 flex justify-center items-center border border-gray-300 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
      <FilterModal isOpen={isOpen} />
    </Layout>
  );
}

export default Shop;
