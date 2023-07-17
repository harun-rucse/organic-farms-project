import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "@/components/layout";
import ProductRatings from "@/components/ProductRatings";
import Loader from "@/components/Loader";
import { fDate } from "@/utils/formatTime";
import { useGetProductQuery } from "@/store/apiSlices/productApiSlice";
import { addToCart } from "@/store/reducers/cartReducer";
import useNotification from "@/hooks/useNotification";
import "react-tabs/style/react-tabs.css";

const ReviewItem = ({ item }) => {
  const { review, rating, user, createdAt } = item;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <img src={user?.image} alt={user?.name} className="w-10 rounded-full" />
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-base font-semibold text-gray-700">
            {user?.name}
          </h3>
          <div className="flex items-center gap-2">
            <ProductRatings rating={rating} />
            <b className="text-gray-600 text-sm">{fDate(createdAt)}</b>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{review}</p>
    </div>
  );
};

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notification = useNotification();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useGetProductQuery(id);
  const { cartItems } = useSelector((state) => state.cart);

  const alreadyInCart = (id) => {
    if (!cartItems) return false;

    const item = cartItems?.find((item) => item._id === id);
    if (item) return true;
  };

  // set quantity to the product minimum order
  useEffect(() => {
    if (product) {
      setQuantity(product?.minimumOrder);
    }
  }, [product]);

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    notification("Product added to cart", "success");
  };

  return (
    <Layout>
      <div className="flex justify-between items-start flex-col md:flex-row gap-6 md:gap-0 md:py-10">
        <div className="w-full flex flex-col md:flex-row items-start justify-evenly pb-10 md:pd-0">
          <div className="w-full md:w-3/5">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="w-60 md:w-80 self-center object-cover"
            />
          </div>
          <div className="w-full flex flex-col gap-5 text-gray-700 text-sm">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{product?.name}</h2>
              <div className="flex items-center gap-2">
                <p>Branch:</p>
                <b>{product?.branchOffice?.address}</b>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt
                  size={14}
                  className="inline-block text-rose-500"
                />
                <span className="text-gray-600 text-sm">
                  {product?.branchOffice?.address}
                </span>
              </div>
              <ProductRatings
                qty={product?.ratingQty}
                rating={product?.ratingAvg}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p>Available:</p>
                <b>{product?.inStock} KG</b>
              </div>
              <div className="flex items-center gap-2">
                <p>Minimum Order:</p>
                <b>{product?.minimumOrder} KG</b>
              </div>
              <div className="flex items-center gap-2">
                <p>Maximum Order:</p>
                <b>{product?.maximumOrder} KG</b>
              </div>
              <div className="flex items-center gap-2">
                <p>Delivery within:</p>
                <b>{product?.maxDeliveryDays} Days</b>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>Price:</p>
              <b className="flex items-center">
                <span className="text-rose-600 mr-2">Tk. {product?.price}</span>
                <span>per KG</span>
              </b>
            </div>
            <div className="md:w-[60%] flex flex-col gap-2 mt-4">
              <div className="flex bg-gray-50 rounded-lg">
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  min={product?.minimumOrder}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-transparent border border-gray-400 rounded-s  outline-none focus:outline-none focus:ring-0"
                />
                <p className="bg-gray-200 p-2 rounded-e text-sm font-semibold">
                  KG
                </p>
              </div>
              <button
                className={` text-white rounded-md px-4 py-2 
                ${
                  alreadyInCart(product?._id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }
                `}
                onClick={handleAddToCart}
                disabled={alreadyInCart(product?._id)}
              >
                {alreadyInCart(product?._id)
                  ? "Already in Cart"
                  : "Add to Cart"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <p>Sold By:</p>
              <b>{product?.farmer?.name}</b>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-10">
        <Tabs className="w-full">
          <TabList className="flex gap-4 border-b border-gray-200">
            <Tab>Description</Tab>
            <Tab>{`Reviews (${product?.reviews?.length})`}</Tab>
          </TabList>

          <TabPanel className="py-6">
            <p>{product?.description}</p>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-8 px-4">
              {product?.reviews?.map((item) => (
                <ReviewItem key={item._id} item={item} />
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Layout>
  );
}

export default ProductDetails;
