import React from "react";
import ListItems from "@/components/ListItems";

const items = [
  { name: "Personal Info", href: "/profile", icon: "/images/person.svg" },
  {
    name: "Orders",
    href: "/profile/orders",
    icon: "/images/shopping-cart.svg"
  },
  { name: "Settings", href: "/profile/settings", icon: "/images/settings.svg" }
];

function ProfileSidebar() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm md:h-72 w-full md:w-60">
      <ListItems items={items} />
    </div>
  );
}

export default ProfileSidebar;
