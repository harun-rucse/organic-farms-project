import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiHome, BiCategory, BiUser, BiShoppingBag } from "react-icons/bi";
import CategoryModal from "@/components/modals/CategoryModal";
import CartModal from "@/components/modals/CartModal";

const Item = ({ icon: Icon, text, count, handleOnClick }) => {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <button
        className="relative text-xl sm:text-3xl text-gray-600 rounded-full group-hover:text-green-600"
        onClick={handleOnClick}
      >
        <Icon />
        {count && (
          <span className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 text-xs flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
      <span className="group-hover:text-green-600 text-xs sm:text-sm">
        {text}
      </span>
    </div>
  );
};

function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  // setIsOpen false when user click main content
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".sticky")) return;
      if (e.target.closest(".sidebar-fixed")) return;
      setIsOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="sticky lg:hidden bottom-0 z-10 flex justify-between items-center py-4 px-12 sm:px-20 bg-white shadow-xl shadow-slate-400">
      <Item icon={BiHome} text="Home" handleOnClick={() => navigate("/")} />
      <Item
        icon={BiCategory}
        text="Category"
        handleOnClick={() => setIsOpen(true)}
      />
      <Item
        icon={BiShoppingBag}
        text="Cart"
        count={cartItems?.length}
        handleOnClick={() => setIsCartOpen(true)}
      />
      <Item
        icon={BiUser}
        text="Profile"
        handleOnClick={() => navigate("/profile")}
      />
      <CategoryModal isOpen={isOpen} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default Navigation;
