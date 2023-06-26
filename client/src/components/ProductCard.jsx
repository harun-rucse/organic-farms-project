import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

const ProductRatings = ({ rating, qty }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((num) => {
          if (rating >= num) {
            return <BsStarFill size={14} className="text-yellow-500" />;
          } else if (rating >= num - 0.5) {
            return <BsStarHalf size={14} className="text-yellow-500" />;
          } else {
            return <BsStarFill size={14} className="text-gray-300" />;
          }
        })}
      </div>
      <span className="text-gray-500 text-sm">({qty})</span>
    </div>
  );
};

function ProductCard({ item, view = "grid" }) {
  const { name, price, image, farmer, ratingQty, ratingAvg } = item;

  if (view === "grid") {
    return (
      <div className="min-w-max flex flex-col items-center gap-4 bg-white rounded-lg shadow-sm">
        <img className="w-72 h-auto object-contain" src={image} alt="" />
        <div className="w-full flex flex-col self-start gap-2 px-6 pb-4">
          <Link to="/products/1">
            <h4 className="text-lg font-semibold text-gray-700 hover:text-red-500 hover:underline">
              {name}
            </h4>
          </Link>

          <ProductRatings qty={ratingQty} rating={ratingAvg} />

          <p className="text-rose-500 text-lg font-bold">${price}/kg</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <b className="text-gray-700">Sold By</b>
              <span className="text-gray-600 text-sm">{farmer?.name}</span>
            </div>
            <button className="self-end w-8 h-8 flex justify-center items-center text-lg font-bold border border-rose-500 rounded-md hover:bg-rose-500 hover:text-white">
              +
            </button>
          </div>
        </div>
      </div>
    );
  } else if (view === "list") {
    return (
      <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-sm">
        <img className="w-52 h-auto object-contain" src={image} alt="" />
        <div className="w-full flex flex-col gap-2 px-8 md:px-0 pb-6 md:pb-0">
          <Link to="/products/1">
            <h4 className="text-lg font-semibold text-gray-700 hover:text-red-500 hover:underline">
              {name}
            </h4>
          </Link>

          <ProductRatings qty={ratingQty} rating={ratingAvg} />

          <p className="text-rose-500 text-lg font-bold">${price}/kg</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <b className="text-gray-700">Sold By</b>
              <span className="text-gray-600 text-sm">{farmer.name}</span>
            </div>
          </div>
          <button className="bg-rose-500 text-white text-sm px-4 py-1 rounded-md font-semibold self-start mt-2">
            Add to cart
          </button>
        </div>
      </div>
    );
  }
}

export default ProductCard;
