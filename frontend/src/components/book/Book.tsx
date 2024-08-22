import { useRef, useState } from "react";
import BookList from "./BookList";
import BookContextProvider from "../../contexts/BookContext";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";

function Book() {
  const addModalRef = useRef<HTMLDialogElement | null>(null);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const editModalRef = useRef<HTMLDialogElement | null>(null);

  const openAddModal = () => {
    addModalRef.current?.showModal();
  };

  const closeAddModal = () => {
    addModalRef.current?.close();
  };

  const openModal = (id: number) => {
    editModalRef.current?.showModal();
    setSelectedBook(id);
  };

  const closeModal = () => {
    setSelectedBook(-1);
    editModalRef.current?.close();
  };

  return (
    <BookContextProvider>
      <h1 className="text-xl font-semibold mt-6 ml-6 py-5">Book List</h1>
      <div className="flex justify-center">
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white font-semibold rounded-full hover:bg-green-500/90 active:bg-green-600/80 px-4 py-2"
        >
          Add new book
        </button>
      </div>
      <BookList onEdit={openModal} />
      <AddBookModal onClose={closeAddModal} ref={addModalRef} />
      <EditBookModal
        selectedBook={selectedBook}
        onClose={closeModal}
        ref={editModalRef}
      />
    </BookContextProvider>
  );
}

export default Book;
