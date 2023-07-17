import { BsStarFill, BsStarHalf } from "react-icons/bs";

function ProductRatings({ rating, qty }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((num) => {
          if (rating >= num) {
            return (
              <BsStarFill key={num} size={14} className="text-yellow-500" />
            );
          } else if (rating >= num - 0.5) {
            return (
              <BsStarHalf key={num} size={14} className="text-yellow-500" />
            );
          } else {
            return <BsStarFill key={num} size={14} className="text-gray-300" />;
          }
        })}
      </div>
      {qty && <span className="text-gray-500 text-sm">({qty})</span>}
    </div>
  );
}

export default ProductRatings;
