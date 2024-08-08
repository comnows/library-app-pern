import { forwardRef, ReactNode } from "react";
import { FaXmark } from "react-icons/fa6";

type ModalProps = {
  onClose?: () => void;
  children: ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { onClose, children },
  ref,
) {
  return (
    <dialog
      ref={ref}
      className="relative max-w-screen-lg max-h-[80vh] px-6 py-6 rounded-xl"
    >
      <button onClick={onClose} className="absolute top-4 right-4">
        <FaXmark />
      </button>
      {children}
    </dialog>
  );
});

export default Modal;
