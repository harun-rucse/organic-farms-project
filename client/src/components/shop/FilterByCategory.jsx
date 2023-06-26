import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const SingleItem = ({ children, item, open, selectedItem, handleOnClick }) => {
  const { href, subItems } = item;

  return (
    <>
      <div
        to={subItems ? "#" : href}
        className={`flex items-center justify-between gap-4 text-sm md:text-base cursor-pointer ${
          open && selectedItem?.name === item.name
            ? "text-red-600"
            : "text-gray-500"
        }  hover:text-red-600`}
        onClick={handleOnClick}
      >
        <span>{children}</span>

        {subItems &&
          (open && selectedItem?.name === item.name ? (
            <BsChevronDown />
          ) : (
            <BsChevronRight />
          ))}
      </div>

      {subItems && open && selectedItem?.name === item.name && (
        <div className="flex flex-col gap-2 ml-4">
          {subItems?.map((subItem) => (
            <div
              key={subItem.name}
              to={subItem.href}
              className="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
            >
              <span>{subItem.name}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

function FilterByCategory({ items }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    if (item.subItems) {
      setSelectedItem(item);
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {items?.map((item) => (
        <SingleItem
          key={item.name}
          item={item}
          handleOnClick={() => handleClick(item)}
          open={open}
          selectedItem={selectedItem}
        >
          {item.name}
        </SingleItem>
      ))}
    </div>
  );
}

export default FilterByCategory;
