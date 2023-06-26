import { items } from "@/mock/categories";
import ListItems from "@/components/ListItems";
import Modal from "./index";

function CategoryModal({ isOpen }) {
  return (
    <Modal isOpen={isOpen}>
      <div className="max-w-xs h-screen bg-white p-8 sidebar-fixed">
        <ListItems items={items} />
      </div>
    </Modal>
  );
}

export default CategoryModal;
