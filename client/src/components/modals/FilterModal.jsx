import { useNavigate } from "react-router-dom";
import FilterByCategory from "@/components/shop/FilterByCategory";
import Modal from "./index";
import { useGetAllSubCategoriesQuery } from "@/store/apiSlices/subCategoryApiSlice";
import { useGetAllBranchesQuery } from "@/store/apiSlices/branchApiSlice";

const BranchItem = ({ name, id, handleOnChange }) => (
  <div className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      id={name}
      checked={
        window.location.search.includes(`branchOffice=${id}`) ? true : false
      }
      className="w-4 h-4 rounded-sm focus:outline-none focus:border-none"
      onChange={() => handleOnChange(id)}
    />
    <label htmlFor={name} className="text-gray-700 text-base cursor-pointer">
      {name}
    </label>
  </div>
);

function FilterModal({ isOpen }) {
  const navigate = useNavigate();
  const { data: subCategories } = useGetAllSubCategoriesQuery();
  const { data: branches } = useGetAllBranchesQuery();
  const items = [];

  // loop through subCategories and push to subItems for same category
  subCategories?.result?.map((subCategory) => {
    const { category, name, _id } = subCategory;

    // sub-category item
    const item = {
      name,
      href: `/shop?subcategory=${_id}`
    };

    // check if category already exists in items array
    const categoryExists = items.find((item) => item.name === category.name);

    if (categoryExists) {
      categoryExists.subItems.push(item);
    } else {
      items.push({
        name: category.name,
        href: `/shop?category=${category._id}`,
        icon: category.image,
        subItems: [item]
      });
    }
  });

  const handleBranchChange = (id) => {
    navigate(`/shop?branchOffice=${id}`);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="max-w-xs h-screen bg-white p-8 filter-modal">
        <h4 className="text-gray-800 font-semibold mb-3 uppercase">
          Categories
        </h4>
        <FilterByCategory items={items} />
        {/* <hr className="border-gray-100 my-6" />

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
        </div> */}

        <hr className="border-gray-100 my-6" />

        <h4 className="text-gray-800 font-semibold mb-3 uppercase">Branch</h4>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="all"
              className="w-4 h-4 rounded-sm focus:outline-none focus:border-none"
              checked={!window.location.search.includes("branchOffice=")}
              onChange={() => navigate("/shop")}
            />
            <label
              htmlFor="all"
              className="text-gray-700 text-base cursor-pointer"
            >
              All Branch
            </label>
          </div>

          {branches?.result?.map((branch) => (
            <BranchItem
              key={branch._id}
              name={branch.name}
              id={branch._id}
              handleOnChange={handleBranchChange}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
