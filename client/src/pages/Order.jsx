import React from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import Layout from "@/components/layout";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileTopbar from "@/components/ProfileTopbar";
import { fDate } from "@/utils/formatTime";
import { useGetMyOrdersQuery } from "@/store/apiSlices/orderApiSlice";
import Loader from "@/components/Loader";

const getStatusColor = (status) => {
  switch (status) {
    case "Placed":
      return "bg-yellow-200";
    case "Processing":
      return "bg-blue-200";
    case "Shipped":
      return "bg-purple-200";
    case "Delivered":
      return "bg-green-200";
    case "Cancelled":
      return "bg-red-200";
    default:
      return "bg-gray-200";
  }
};

const OrderItem = ({ item }) => {
  const { _id, orderStatus, orderPlacedDate, grandTotalAmount } = item;

  return (
    <tr className="bg-white shadow-md border-b border-gray-100 text-gray-600">
      <td className="py-4 text-xs md:text-sm md:font-lg font-semibold">
        {_id}
      </td>
      <td
        className={`my-4 ${getStatusColor(
          orderStatus
        )} inline-block text-gray-600 font-semibold px-2 py-1 rounded-xl text-xs`}
      >
        {orderStatus}
      </td>
      <td className="text-xs md:font-base">{fDate(orderPlacedDate)}</td>
      <td className="text-xs md:font-base font-bold">{grandTotalAmount}</td>
      <td className="text-xs md:font-base">
        <Link to={`/profile/orders/${_id}`}>
          <BsArrowRight className="cursor-pointer text-sm md:text-lg" />
        </Link>
      </td>
    </tr>
  );
};

function Order() {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-start gap-6 py-10">
        <ProfileSidebar />
        <div className="w-full flex flex-col gap-8">
          <ProfileTopbar
            icon={BiShoppingBag}
            title="My Order"
            link="/profile"
            linkText="Back To Profile"
          />
          <div className="flex flex-col gap-4 md:px-6">
            <table className="text-center table-auto">
              <thead className="text-gray-500 font-thin">
                <th className="md:px-4 py-4 text-sm md:font-base">Order #</th>
                <th className="md:px-4 py-4 text-sm md:font-base">Status</th>
                <th className="md:px-4 py-4 text-sm md:font-base">
                  Date purchased
                </th>
                <th className="md:px-4 py-4 text-sm md:font-base">Total</th>
              </thead>
              <tbody>
                {orders?.map((item) => (
                  <OrderItem key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Order;
