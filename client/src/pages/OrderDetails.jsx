import React, { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout";
import ProfileSidebar from "@/components/ProfileSidebar";
import ProfileTopbar from "@/components/ProfileTopbar";
import WriteReviewModal from "@/components/modals/WriteReviewModal";
import { fDate } from "@/utils/formatTime";
import { useGetMySingleOrderQuery } from "@/store/apiSlices/orderApiSlice";
import { useCreateReviewMutation } from "@/store/apiSlices/reviewApiSlice";
import Loader from "@/components/Loader";
import useNotification from "@/hooks/useNotification";

const OrderItem = ({ item, setOpen, setProductId, orderStatus }) => {
  const { product, quantity } = item;

  return (
    <tr className="bg-white shadow-md border-b border-gray-100 text-gray-600">
      <td className="px-6">
        <img
          src={product?.images[0]}
          alt={product?.name}
          className="w-20 h-20 object-cover"
        />
      </td>
      <td className="px-6 font-semibold text-xs md:text-base">
        <Link to={`/products/${product?._id}`}>{product?.name}</Link>
      </td>
      <td className="px-6 font-semibold text-xs md:text-base">
        Tk. {product?.price} x {quantity}
      </td>
      <td className="px-6">
        {orderStatus === "Delivered" && (
          <button
            className="text-rose-600 text-xs md:text-base md:px-2 py-1 rounded-md hover:bg-rose-50"
            onClick={() => {
              setOpen(true);
              setProductId(product?._id);
            }}
          >
            Write a Review
          </button>
        )}
      </td>
    </tr>
  );
};

function OrderDetails() {
  const { id } = useParams();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  const { data: order, isLoading } = useGetMySingleOrderQuery(id);
  const [
    createReview,
    { isLoading: isReviewLoading, isSuccess, isError, error }
  ] = useCreateReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification("Review created successfully", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setOpen(false);
      notification(error?.data?.message, "error");
    }
  }, [isError]);

  const handleWriteReview = (value) => {
    const { review, rating } = value;
    createReview({
      review,
      rating,
      product: productId,
      order: order?._id
    });
  };

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
            title="Order Details"
            link="/profile"
            linkText="Back To Profile"
          />
          <div className="flex flex-col md:px-6">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 md:items-center justify-between bg-gray-100 text-gray-600 py-4 px-6 text-sm">
              <div className="flex items-center gap-3">
                <b>Order ID:</b>
                <span>{order?._id}</span>
              </div>
              <div className="flex items-center gap-3">
                <b>Order Status:</b>
                <span>{order?.orderStatus}</span>
              </div>
              <div className="flex items-center gap-3">
                <b>Placed on:</b>
                <span>{fDate(order?.orderPlacedDate)}</span>
              </div>
              <div className="flex items-center gap-3">
                <b>Deliverd on:</b>
                <span>{fDate(order?.orderDeliveredDate)}</span>
              </div>
            </div>
            <table className="table-auto">
              <tbody>
                {order?.products?.map((item) => (
                  <OrderItem
                    item={item}
                    key={item._id}
                    setOpen={setOpen}
                    setProductId={setProductId}
                    orderStatus={order?.orderStatus}
                  />
                ))}
              </tbody>
            </table>
            <div className="flex flex-col md:flex-row items-start gap-6 mt-10">
              <div className="w-full bg-white p-6 rounded-xl shadow">
                <h4 className="text-lg font-semibold text-gray-500">
                  Shipping Address
                </h4>
                <p className="text-sm text-gray-700 mt-2">
                  {order?.deliveryAddress}
                </p>
              </div>
              <div className="w-full bg-white p-6 rounded-xl shadow flex flex-col gap-4">
                <h4 className="text-lg font-semibold text-gray-500">
                  Total Summary
                </h4>
                <div className="border-b text-gray-500 pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <b>Tk. {order?.totalAmount}</b>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping:</p>
                    <b>Tk. {order?.deliveryCharge}</b>
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>Total:</p>
                  <b>Tk. {order?.grandTotalAmount}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WriteReviewModal
        isOpen={open}
        onClose={() => setOpen(false)}
        handleSubmit={handleWriteReview}
        loading={isReviewLoading}
      />
    </Layout>
  );
}

export default OrderDetails;
