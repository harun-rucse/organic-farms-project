import { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const SingleItem = ({ children, item, open, selectedItem, handleOnClick }) => {
  const { href, icon, subItems } = item;

  return (
    <>
      <Link
        to={subItems ? "#" : href}
        className={`flex items-center justify-between gap-4 text-sm md:text-base ${
          open && selectedItem?.name === item.name
            ? "text-red-600"
            : "text-gray-500"
        }  hover:text-red-600 font-semibold`}
        onClick={handleOnClick}
      >
        <div className="flex items-center gap-4">
          <img src={icon} className="object-contain w-6" />
          <span>{children}</span>
        </div>
        {subItems &&
          (open && selectedItem?.name === item.name ? (
            <BsChevronDown />
          ) : (
            <BsChevronRight />
          ))}
      </Link>

      {subItems && open && selectedItem?.name === item.name && (
        <div className="flex flex-col gap-2 ml-10 -mt-3">
          {subItems?.map((subItem) => (
            <Link
              key={subItem.name}
              to={subItem.href}
              className="text-lg text-gray-500 hover:text-red-600"
            >
              <span>{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

function ListItems({ items }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    if (item.subItems) {
      setSelectedItem(item);
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-col gap-6">
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

export default ListItems;
