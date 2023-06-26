import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import { MdClose } from "react-icons/md";
import Button from "@/components/Button";
import { items } from "@/mock/carts";

const Item = ({ item }) => {
  const { image, name, price, quantity } = item;

  return (
    <div className="flex items-center flex-col md:flex-row gap-4 bg-white shadow-md p-5 md:p-6 rounded-lg">
      <MdClose className="block md:hidden self-start ml-auto text-4xl text-gray-600 hover:bg-gray-200 rounded-full p-2 cursor-pointer" />
      <img
        src={image}
        alt={name}
        className="w-36 h-36 object-cover object-center"
      />
      <div className="flex flex-col gap-3 md:gap-4">
        <h4 className="text-xl text-gray-600 font-semibold leading-9">
          {name}
        </h4>
        <p className="text-gray-500 text-sm md:text-base leading-9">
          {`$${price} x ${quantity}`}{" "}
          <span className="text-red-500 font-semibold ml-2">{`$${
            price * quantity
          }`}</span>
        </p>
        <div className="flex items-center gap-4">
          <button className="border border-red-400 w-8 md:w-8 h-8 md:h-8 text-xl font-bold text-red-600 rounded-lg">
            -
          </button>
          <span className="text-gray-600 text-xl font-bold">{quantity}</span>
          <button className="border border-red-400 w-8 md:w-8 h-8 md:h-8 text-xl font-bold text-red-600 rounded-lg">
            +
          </button>
        </div>
      </div>
      <MdClose className="hidden md:block self-start ml-auto text-4xl text-gray-600 hover:bg-gray-200 rounded-full p-2 cursor-pointer" />
    </div>
  );
};

function Cart() {
  return (
    <Layout>
      <div className="flex justify-between items-start flex-col md:flex-row gap-6 md:gap-0">
        <div className="flex w-full md:w-3/5 flex-col gap-7">
          {items.map((item) => (
            <Item key={item._id} item={item} />
          ))}
        </div>

        <div className="w-full md:w-2/5 flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-lg">Subtotal:</span>
            <b className="text-xl font-semibold leading-9 text-gray-700">
              $350.00
            </b>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-lg">Shipping:</span>
            <b className="text-xl font-semibold leading-9 text-gray-700">
              $10.00
            </b>
          </div>
          <div className="border-t border-gray-200 w-full pt-4 mt-4">
            <b className="text-2xl md:text-2xl font-semibold leading-9 text-gray-700 block text-right">
              $2,610.00
            </b>
          </div>
          <Link to="/checkout">
            <Button
              className="mt-6 px-2 py-2 md:px-2 md:py-3"
              variant="contained"
            >
              Checkout Now
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
