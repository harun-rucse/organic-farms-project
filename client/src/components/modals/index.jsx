import { createPortal } from "react-dom";

function Modal({ children, isOpen, className }) {
  const portalContainer = document.getElementById("portal-root");

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-70 z-[9999] ${className}`}
    >
      {children}
    </div>,
    portalContainer
  );
}

export default Modal;
