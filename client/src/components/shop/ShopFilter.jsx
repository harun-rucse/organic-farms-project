import FilterByCategory from "@/components/shop/FilterByCategory";
import { items } from "@/mock/categories";

function ShopFilter() {
  return (
    <div className="hidden xl:block sticky top-24 left-0 bg-white w-[20rem] h-[45rem] shadow-md shadow-slate-200 rounded-md px-8 py-4">
      <h4 className="text-gray-800 font-semibold mb-3 uppercase">Categories</h4>
      <FilterByCategory items={items} />

      <hr className="border-gray-100 my-6" />

      <h4 className="text-gray-800 font-semibold mb-3 uppercase">
        Price Range
      </h4>
      <div className="flex items-center gap-2 text-sm">
        <input
          type="text"
          placeholder="Min"
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
        <span className="text-gray-400">-</span>
        <input
          type="text"
          placeholder="Max"
          className="border border-gray-300 rounded-md px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
        />
      </div>

      <hr className="border-gray-100 my-6" />

      <h4 className="text-gray-800 font-semibold mb-3 uppercase">Branch</h4>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="branch-1"
            className="w-4 h-4 rounded-sm focus:outline-none focus:border-none"
          />
          <label
            htmlFor="branch-1"
            className="text-gray-700 text-base cursor-pointer"
          >
            Branch 1
          </label>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="branch-2"
            className="w-4 h-4 rounded-sm focus:outline-none focus:border-none"
          />
          <label
            htmlFor="branch-2"
            className="text-gray-700 text-base cursor-pointer"
          >
            Branch 2
          </label>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="branch-3"
            className="w-4 h-4 rounded-sm focus:outline-none focus:border-none"
          />
          <label
            htmlFor="branch-3"
            className="text-gray-700 text-base cursor-pointer"
          >
            Branch 3
          </label>
        </div>
      </div>
    </div>
  );
}

export default ShopFilter;
