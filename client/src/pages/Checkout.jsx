import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import Button from "@/components/Button";

function Checkout() {
  return (
    <Layout>
      <div className="flex justify-between items-start flex-col md:flex-row gap-6 md:gap-0">
        <div className="flex w-full md:w-3/5 flex-col gap-7">
          {/* Shipping form */}
          <form className="flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
            <h4 className="text-xl md:text-xl font-medium leading-9 text-gray-700">
              Shipping Address
            </h4>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />

                <input
                  type="text"
                  placeholder="Customer Address"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <textarea
                  rows={4}
                  placeholder="Delevery Address"
                  className="border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
            </div>
          </form>

          {/* Billing address */}
          <form className="flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
            <h4 className="text-xl md:text-xl font-medium leading-9 text-gray-700">
              Billing Address
            </h4>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="same-address"
                className="w-5 h-5 rounded-sm focus:outline-none focus:border-none"
              />
              <label
                htmlFor="same-address"
                className="text-gray-500 text-lg md:text-xl"
              >
                Same as shipping address
              </label>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />

                <input
                  type="text"
                  placeholder="Customer Address"
                  className="w-full border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <textarea
                  rows={4}
                  placeholder="Delevery Address"
                  className="border border-gray-300 px-4 py-3 text-lg rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
              </div>
            </div>
          </form>
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
          <div>
            <Link to="/cart">
              <Button
                className="mt-6 px-2 py-2 md:px-2 md:py-3"
                variant="outlined"
              >
                Back to Cart
              </Button>
            </Link>
            <Button
              className="mt-6 px-2 py-2 md:px-2 md:py-3"
              variant="contained"
            >
              Proceed To Payment
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
