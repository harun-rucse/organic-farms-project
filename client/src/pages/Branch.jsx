import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsPhoneFill, BsArrowRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Layout from "@/components/layout";
import { Link } from "react-router-dom";

const SingleItem = ({ item }) => {
  const { name, address, phone } = item;

  return (
    <div className="min-w-[21rem] md:min-w-[22rem] lg:min-w-[25rem] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col gap-2 bg-gray-900 opacity-80 p-5 md:p-8 text-white text-lg">
        <h2 className="text-xl md:text-2xl leading-8 font-semibold mb-6">
          {name}
        </h2>
        <div className="flex items-start gap-3 md:text-lg">
          <FaMapMarkerAlt size={18} />
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-3 md:text-lg">
          <BsPhoneFill size={18} />
          <span>{phone}</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex justify-center items-center bg-white -mt-12 w-12 md:w-16 h-12 md:h-16 rounded-full border border-green-500 z-10">
          <MdVerified className="text-4xl md:text-5xl text-gray-600" />
        </div>
        <Link to={`/branch/${item._id}`}>
          <BsArrowRight className="w-10 h-10 font-bold p-2 hover:bg-gray-200 rounded-full cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

function Branch() {
  return (
    <Layout>
      <div className="flex flex-col items-start gap-8">
        <h2 className="text-3xl font-semibold leading-9">All Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SingleItem
            item={{
              _id: "1",
              name: "Branch 1",
              address: "Address 1",
              phone: "1234567890"
            }}
          />
          <SingleItem
            item={{
              _id: "2",
              name: "Branch 2",
              address: "Address 2",
              phone: "1234567890"
            }}
          />
          <SingleItem
            item={{
              _id: "3",
              name: "Branch 3",
              address: "Address 3",
              phone: "1234567890"
            }}
          />
          <SingleItem
            item={{
              name: "Branch 4",
              address: "Address 4",
              phone: "1234567890"
            }}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Branch;
