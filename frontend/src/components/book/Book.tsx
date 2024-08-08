import { useRef, useState } from "react";
import BookList from "./BookList";
import Modal from "../general/modal/Modal";
import EditBookForm from "./EditBookForm";

function Book() {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const editModalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (id: number) => {
    editModalRef.current?.showModal();
    setSelectedBook(id);
  };

  const closeModal = () => {
    editModalRef.current?.close();
  };

  return (
    <>
      <h1 className="text-xl font-semibold mt-6 ml-6 py-5">Book List</h1>
      <BookList onEdit={openModal} />
      <Modal onClose={closeModal} ref={editModalRef}>
        {selectedBook && <EditBookForm id={selectedBook} />}
      </Modal>
    </>
  );
}

export default Book;
