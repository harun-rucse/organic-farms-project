import { items } from "@/mock/categories";
import ListItems from "@/components/ListItems";

function Sidebar() {
  return (
    <div className="hidden xl:block sticky top-24 left-0 bg-white w-[20rem] h-[45rem] shadow-md shadow-slate-200 rounded-md p-8">
      <ListItems items={items} />
    </div>
  );
}

export default Sidebar;
