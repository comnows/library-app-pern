import { forwardRef } from "react";
import Modal from "../general/modal/Modal";
import AddBookForm from "./AddBookForm";
import { useBookContext } from "../../hooks/UseBookContext";

type AddBookModalProps = {
  onClose: () => void;
};

const AddBookModal = forwardRef<HTMLDialogElement, AddBookModalProps>(
  function AddBookModal({ onClose }, ref) {
    const { clearInput } = useBookContext();

    return (
      <Modal
        onClose={() => {
          onClose();
          clearInput();
        }}
        ref={ref}
      >
        <AddBookForm onClose={onClose} />
      </Modal>
    );
  },
);

export default AddBookModal;
