import { BiShoppingBag } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import Modal from "./index";
import { items } from "@/mock/carts";
import Button from "../Button";

const Item = ({ item }) => {
  const { name, price, image, quantity } = item;

  return (
    <div className="flex justify-between items-center gap-2 border-b border-gray-100 px-8 py-4">
      <div className="flex flex-col items-center gap-2">
        <button className="flex items-center justify-center border border-red-400 w-8 md:w-8 h-8 md:h-8 md:text-2xl font-bold text-red-600 rounded-full">
          +
        </button>
        <span className="text-gray-800 font-bold">{quantity}</span>
        <button
          className={`flex items-center justify-center border ${
            quantity === 1
              ? "border-gray-400 text-gray-600 cursor-not-allowed"
              : "border-red-400 text-red-600"
          } w-8 md:w-8 h-8 md:h-8 md:text-2xl font-bold rounded-full`}
          disabled={quantity === 1}
        >
          -
        </button>
      </div>
      <div className="flex items-center gap-2">
        <img src={image} alt={name} className="w-24 h-24 object-cover" />
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-600 font-semibold text-sm">
            {name.substring(0, 20) + "..."}
          </h4>
          <p className="text-sm text-gray-500 font-semibold">{`$${price} x ${quantity}`}</p>
          <b className="text-red-500 text-lg">{price * quantity}</b>
        </div>
      </div>
      <MdClose className="text-xl cursor-pointer hover:text-red-700" />
    </div>
  );
};

function CartModal({ isOpen, onClose }) {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Modal isOpen={isOpen} className="shadow-2xl">
      <div className="max-w-[25rem] ml-auto h-screen bg-white sidebar-fixed">
        {/* Modal header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-4 ">
            <BiShoppingBag className="text-2xl text-gray-700" />
            <span className="text-lg font-semibold text-gray-700">
              ({items.length}) items
            </span>
          </div>
          <MdClose
            className="text-[2.4rem] text-gray-700 hover:bg-gray-200 p-2 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Modal content */}
        <div className="h-[24rem] overflow-y-auto no-scrollbar">
          {items.map((item) => (
            <Item key={item._id} item={item} />
          ))}
        </div>

        {/* Modal footer */}
        <div className="flex flex-col gap-4 p-6 mt-4">
          <Button variant="contained" className="bg-pink-600 hover:bg-pink-500">
            Checkout Now (${totalPrice})
          </Button>
          <Link to="/cart">
            <Button variant="outlined" className="text-rose-600">
              View Cart
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

export default CartModal;
