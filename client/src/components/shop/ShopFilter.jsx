import { useNavigate } from "react-router-dom";
import FilterByCategory from "@/components/shop/FilterByCategory";
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

function ShopFilter() {
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
    <div className="hidden xl:block sticky top-24 left-0 bg-white w-[20rem] h-[45rem] shadow-md shadow-slate-200 rounded-md px-8 py-4">
      <h4 className="text-gray-800 font-semibold mb-3 uppercase">Categories</h4>
      <FilterByCategory items={items} />

      <hr className="border-gray-100 my-6" />
      <h4 className="text-gray-800 font-semibold mb-3 uppercase">Branch</h4>

      <div className="flex flex-col gap-3">
        {/* All Branch select for clear filter */}
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
  );
}

export default ShopFilter;
