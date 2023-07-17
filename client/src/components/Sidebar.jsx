import ListItems from "@/components/ListItems";
import { useGetAllSubCategoriesQuery } from "@/store/apiSlices/subCategoryApiSlice";
import Loader from "@/components/Loader";

function Sidebar() {
  const { data: subCategories, isLoading } = useGetAllSubCategoriesQuery();

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

  return (
    <div className="hidden xl:block sticky top-24 left-0 bg-white w-[20rem] h-[45rem] shadow-md shadow-slate-200 rounded-md p-8">
      {isLoading ? <Loader /> : <ListItems items={items} />}
    </div>
  );
}

export default Sidebar;
