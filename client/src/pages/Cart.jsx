import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/layout";
import { MdClose } from "react-icons/md";
import Button from "@/components/Button";
import {
  addToCart,
  removeCartItem,
  deleteCartItem
} from "@/store/reducers/cartReducer";
import useNotification from "@/hooks/useNotification";

const Item = ({
  item,
  handleAddToCart,
  handleRemoveCartItem,
  handleDeleteCartItem
}) => {
  const { images, name, price, quantity, subcategory } = item;

  return (
    <div className="flex items-center flex-col md:flex-row gap-4 bg-white shadow-md p-5 md:p-6 rounded-lg">
      <MdClose className="block md:hidden self-start ml-auto text-4xl text-gray-600 hover:bg-gray-200 rounded-full p-2 cursor-pointer" />
      <img
        src={images && images[0]}
        alt={name}
        className="w-32 h-32 object-cover object-center"
      />
      <div className="flex flex-col gap-3 md:gap-4">
        <div>
          <h4 className="text-xl text-gray-600 font-semibold leading-9">
            {name}
          </h4>
          <p>
            Category:
            <strong className="text-gray-600 ml-2">
              {subcategory?.category?.name}
            </strong>
          </p>
        </div>
        <p className="text-gray-500 text-sm md:text-base leading-9">
          {`${price} Tk. x ${quantity} kg`}
          <span className="text-green-600 font-bold ml-2">{`Tk.${
            price * quantity
          }`}</span>
        </p>
        <div className="flex items-center gap-4">
          <button
            className="border border-green-600 w-8 md:w-8 h-8 md:h-8 text-xl font-bold text-green-600 rounded-lg"
            onClick={() => handleRemoveCartItem(item)}
          >
            -
          </button>
          <span className="text-gray-600 text-xl font-bold">{quantity}</span>
          <button
            className="border border-green-600 w-8 md:w-8 h-8 md:h-8 text-xl font-bold text-green-600 rounded-lg"
            onClick={() => handleAddToCart(item)}
          >
            +
          </button>
        </div>
      </div>
      <MdClose
        className="hidden md:block self-start ml-auto text-4xl text-gray-600 hover:bg-gray-200 rounded-full p-2 cursor-pointer"
        onClick={() => handleDeleteCartItem(item)}
      />
    </div>
  );
};

function Cart() {
  const dispatch = useDispatch();
  const notification = useNotification();
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalShipping = cartItems?.reduce(
    (acc, item) => acc + item?.branchOffice?.deliveryFee * item.quantity,
    0
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleRemoveCartItem = (product) => {
    dispatch(removeCartItem(product));
  };

  const handleDeleteCartItem = (product) => {
    dispatch(deleteCartItem(product));
    notification("Product removed from cart", "warning");
  };

  return (
    <Layout>
      <div className="flex justify-between items-start flex-col md:flex-row gap-6 md:gap-0">
        <div className="flex w-full md:w-3/5 flex-col gap-7">
          {/* Show empy cart message */}
          {cartItems?.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700">
                Your cart is empty!
              </h3>
              <Link to="/shop">
                <Button variant="contained" className="py-2">
                  Go to Shop
                </Button>
              </Link>
            </div>
          )}

          {cartItems?.map((item) => (
            <Item
              key={item._id}
              item={item}
              handleAddToCart={handleAddToCart}
              handleRemoveCartItem={handleRemoveCartItem}
              handleDeleteCartItem={handleDeleteCartItem}
            />
          ))}
        </div>

        <div className="w-full md:w-2/5 flex flex-col gap-4 bg-white md:ml-10 px-6 py-12 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-lg">Subtotal:</span>
            <b className="text-xl font-semibold leading-9 text-gray-700">
              Tk. {totalPrice}
            </b>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-lg">Shipping:</span>
            <b className="text-xl font-semibold leading-9 text-gray-700">
              Tk. {totalShipping}
            </b>
          </div>
          <div className="border-t border-gray-200 w-full pt-4 mt-4">
            <b className="text-2xl md:text-2xl font-semibold leading-9 text-gray-700 block text-right">
              Tk. {totalPrice + totalShipping}
            </b>
          </div>
          <Link to="/checkout">
            <Button
              className="mt-6 px-2 py-2.5 bg-blue-600 hover:bg-blue-500"
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
