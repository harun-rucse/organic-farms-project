import { BiShoppingBag } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./index";
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
  const { name, price, images, quantity, minimumOrder, maximumOrder } = item;

  return (
    <div className="flex justify-between items-center gap-2 border-b border-gray-100 px-8 py-4">
      <div className="flex flex-col items-center gap-2">
        <button
          className="flex items-center justify-center border border-green-600 w-8 md:w-8 h-8 md:h-8 md:text-2xl font-bold text-green-600 rounded-full"
          onClick={() => handleAddToCart(item)}
          disabled={quantity >= maximumOrder}
        >
          +
        </button>
        <span className="text-gray-800 font-bold">{quantity}</span>
        <button
          className={`flex items-center justify-center border ${
            quantity === 1
              ? "border-gray-400 text-gray-600 cursor-not-allowed"
              : "border-green-600 text-green-600"
          } w-8 md:w-8 h-8 md:h-8 md:text-2xl font-bold rounded-full`}
          disabled={quantity <= minimumOrder}
          onClick={() => handleRemoveCartItem(item)}
        >
          -
        </button>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={images && images[0]}
          alt={name}
          className="w-24 h-24 object-cover"
        />
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-600 font-semibold text-sm">
            {name.substring(0, 20) + "..."}
          </h4>
          <p className="text-sm text-gray-500 font-semibold">{`${price} Tk x ${quantity} kg`}</p>
          <b className="text-green-500 text-lg">Tk. {price * quantity}</b>
        </div>
      </div>
      <MdClose
        className="text-xl cursor-pointer hover:text-red-700"
        onClick={() => handleDeleteCartItem(item)}
      />
    </div>
  );
};

function CartModal({ isOpen, onClose }) {
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
    <Modal isOpen={isOpen} className="shadow-2xl">
      <div className="max-w-[25rem] ml-auto h-screen bg-white sidebar-fixed">
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-4 ">
            <BiShoppingBag className="text-2xl text-gray-700" />
            <span className="text-lg font-semibold text-gray-700">
              ({cartItems?.length}) items
            </span>
          </div>
          <MdClose
            className="text-[2.4rem] text-gray-700 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Modal content */}
        <div className="h-[62%] overflow-y-auto no-scrollbar">
          {cartItems?.map((item) => (
            <Item
              key={item._id}
              item={item}
              handleAddToCart={handleAddToCart}
              handleRemoveCartItem={handleRemoveCartItem}
              handleDeleteCartItem={handleDeleteCartItem}
            />
          ))}

          {cartItems?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xl text-gray-600">Cart is empty</p>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex flex-col gap-4 p-6 mt-4">
          <Link to="/checkout">
            <Button
              variant="contained"
              className="bg-green-600 hover:bg-green-500 py-2"
              disabled={cartItems?.length === 0}
            >
              Checkout Now (${totalPrice + totalShipping})
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="outlined" className="text-green-600 py-2">
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
