import { forwardRef } from "react";
import Modal from "../general/modal/Modal";
import EditBookForm from "./EditBookForm";
import { useBookContext } from "../../hooks/UseBookContext";

type EditBookModalProps = {
  selectedBook: number | null;
  onClose: () => void;
};

const EditBookModal = forwardRef<HTMLDialogElement, EditBookModalProps>(
  function EditBookModal({ selectedBook, onClose }, ref) {
    const { clearInput } = useBookContext();

    return (
      <Modal
        onClose={() => {
          onClose();
          clearInput();
        }}
        ref={ref}
      >
        {selectedBook && <EditBookForm id={selectedBook} onClose={onClose} />}
      </Modal>
    );
  },
);

export default EditBookModal;
