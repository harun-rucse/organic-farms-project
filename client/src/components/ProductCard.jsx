import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProductRatings from "./ProductRatings";

function ProductCard({ item, view = "grid" }) {
  const {
    _id,
    name,
    price,
    images,
    farmer,
    ratingQty,
    ratingAvg,
    inStock,
    branchOffice,
    subcategory
  } = item;

  if (view === "grid") {
    return (
      <div className="w-full flex flex-col items-center gap-4 bg-white rounded-lg shadow-sm relative overflow-hidden">
        <div
          className={`absolute top-3 left-4 
        ${inStock ? "bg-green-500" : "bg-red-500"}
        text-white text-xs px-2 py-1 rounded-lg`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
        <img
          className="w-full h-[15rem] object-cover"
          src={images && images[0]}
          alt={name}
        />
        <div className="w-full flex flex-col self-start gap-2 px-6 pb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={14} className="inline-block text-rose-500" />
            <span className="text-gray-600 text-sm">
              {branchOffice?.address}
            </span>
          </div>
          <Link to={`/products/${_id}`}>
            <h4 className="text-lg font-semibold text-gray-700 hover:text-red-500 hover:underline">
              {name}
            </h4>
          </Link>

          <ProductRatings qty={ratingQty} rating={ratingAvg} />

          <p className="text-rose-500 text-lg font-bold">${price}/kg</p>
          <p className="text-sm">
            Category:
            <span className="font-bold text-gray-600 ml-1">
              {subcategory?.category?.name} ({subcategory?.name})
            </span>
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <b className="text-gray-700">Sold By</b>
              <span className="text-gray-600 text-sm">{farmer?.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (view === "list") {
    return (
      <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-sm relative overflow-hidden">
        <div
          className={`absolute top-3 left-4 
        ${inStock ? "bg-green-500" : "bg-red-500"}
        text-white text-xs px-2 py-1 rounded-lg`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </div>
        <img
          className="w-full md:w-48 h-[16rem] md:h-full object-cover"
          src={images && images[0]}
          alt={name}
        />
        <div className="w-full flex flex-col p-4 gap-2 px-8 md:px-0 pb-6 md:pb-0">
          <Link to={`/products/${_id}`}>
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
        </div>
      </div>
    );
  }
}

export default ProductCard;
