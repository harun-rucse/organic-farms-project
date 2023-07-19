import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsPhoneFill, BsArrowRight } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import Layout from "@/components/layout";
import { useGetAllBranchesQuery } from "@/store/apiSlices/branchApiSlice";
import Loader from "@/components/Loader";

const SingleItem = ({ item }) => {
  const { name, address, phone } = item;

  return (
    <div className="min-w-[21rem] md:min-w-[22rem] lg:min-w-[25rem] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col gap-2 bg-green-700/90 p-5 md:p-8 text-white text-lg">
        <h2 className="text-xl md:text-2xl leading-8 font-semibold mb-6">
          {name}
        </h2>
        <div className="flex items-center gap-3 md:text-lg">
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
        <Link to={`/shop/?branchOffice=${item._id}`}>
          <BsArrowRight className="w-10 h-10 font-bold p-2 hover:bg-gray-200 rounded-full cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

function Branch() {
  const { data: branches, isLoading } = useGetAllBranchesQuery();

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-start gap-8">
        <h2 className="text-3xl font-semibold leading-9">All Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches?.result?.map((branch) => (
            <SingleItem key={branch._id} item={branch} />
          ))}
        </div>
        {/* Show No item found message */}
        {branches?.result?.length === 0 && (
          <div className="w-full flex items-center justify-center text-center col-span-full">
            <h3 className="text-xl text-gray-500 font-semibold">
              Branches are not available
            </h3>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Branch;
