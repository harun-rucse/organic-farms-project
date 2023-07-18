import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout";
import Button from "@/components/Button";

function PaymentFail() {
  return (
    <Layout>
      <div className="flex justify-center items-start py-10">
        <div className="flex flex-col items-center gap-6 bg-white px-8 md:px-16 py-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-2xl md:text-3xl font-bold text-red-500">
              Your order payment is failed!
            </h4>
            <p className="text-sm md:text-base text-gray-600 text-center">
              Please try again later.
            </p>
          </div>
          <Link to="/profile/orders">
            <Button className="py-2 md:py-3">Go to home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentFail;
