import Modal from "./index";
import ListItems from "@/components/ListItems";
import Loader from "@/components/Loader";
import { useGetAllSubCategoriesQuery } from "@/store/apiSlices/subCategoryApiSlice";

function CategoryModal({ isOpen }) {
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
    <Modal isOpen={isOpen}>
      <div className="max-w-xs h-screen bg-white p-8 sidebar-fixed">
        {isLoading ? <Loader /> : <ListItems items={items} />}
      </div>
    </Modal>
  );
}

export default CategoryModal;
