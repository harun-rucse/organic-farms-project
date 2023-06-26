import React from "react";
import Layout from "@/components/layout";
import Sidebar from "@/components/Sidebar";
import HeroCarousel from "@/components/caousel/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { items } from "@/mock/products";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div className="flex items-start gap-6">
        <Sidebar />

        <div className="flex-1 flex flex-col gap-4">
          {/* Carousel */}
          <HeroCarousel />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="flex items-center gap-6 border p-4 rounded-lg">
              <img
                className="w-12 h-12 md:w-14 md:h-14"
                src="/images/delivery.svg"
                alt=""
              />
              <div>
                <h4 className="text-sm md:text-xl text-gray-700 font-semibold">
                  Fast Delivery
                </h4>
                <p className="text-gray-500 text-sm">Start from $10</p>
              </div>
            </div>

            <div className="flex items-center gap-6 border p-4 rounded-lg">
              <img
                className="w-12 h-12 md:w-14 md:h-14"
                src="/images/feedback.svg"
                alt=""
              />
              <div>
                <h4 className="text-sm md:text-xl text-gray-700 font-semibold">
                  Feedback
                </h4>
                <p className="text-gray-500 text-sm">97% positive</p>
              </div>
            </div>

            <div className="flex items-center gap-6 border p-4 rounded-lg">
              <img
                className="w-12 h-12 md:w-14 md:h-14"
                src="/images/payment.svg"
                alt=""
              />
              <div>
                <h4 className="text-sm md:text-xl text-gray-700 font-semibold">
                  Payment
                </h4>
                <p className="text-gray-500 text-sm">100% secured</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-12">
            <h2 className="text-3xl font-semibold leading-9">
              Latest Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {items.slice(0, 6).map((item) => (
                <ProductCard key={item._id} item={item} view="grid" />
              ))}
            </div>
            <Link to="/shop" className="self-center">
              <button className="px-4 py-2 mt-6 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition duration-200">
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
