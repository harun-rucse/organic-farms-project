import { MdClose } from "react-icons/md";
import { items } from "@/mock/navigations";
import ListItems from "@/components/ListItems";
import Modal from "./index";

function FullNavigationModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} className="bg-white bg-opacity-100">
      <div className="max-w-2xl mx-auto flex flex-col justify-center gap-6 px-16 py-12 mt-6">
        <div className="self-end cursor-pointer mb-4">
          <MdClose
            className="text-4xl text-gray-700 hover:bg-gray-200 p-2 rounded-full"
            onClick={onClose}
          />
        </div>

        <ListItems items={items} />
      </div>
    </Modal>
  );
}

export default FullNavigationModal;
