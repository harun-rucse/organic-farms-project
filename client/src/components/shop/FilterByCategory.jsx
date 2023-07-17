import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const SingleItem = ({
  children,
  item,
  open,
  selectedItem,
  handleOnClick,
  selectedSubItem,
  handleSelectSubItem
}) => {
  const { href, subItems } = item;

  return (
    <>
      <div
        to={subItems ? "#" : href}
        className={`flex items-center justify-between gap-4 text-sm md:text-base cursor-pointer ${
          open && selectedItem?.name === item.name
            ? "text-red-600 font-semibold"
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
            <Link
              key={subItem.name}
              to={subItem.href}
              className={`text-sm text-gray-500 hover:text-red-600 cursor-pointer
                ${
                  selectedSubItem?.name === subItem.name &&
                  "text-red-600 font-semibold"
                }
              `}
              onClick={() => handleSelectSubItem(subItem)}
            >
              <span>{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

function FilterByCategory({ items }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

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
          selectedSubItem={selectedSubItem}
          handleSelectSubItem={(subItem) => setSelectedSubItem(subItem)}
        >
          {item.name}
        </SingleItem>
      ))}
    </div>
  );
}

export default FilterByCategory;
