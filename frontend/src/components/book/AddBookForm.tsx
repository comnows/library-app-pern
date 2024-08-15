import BookForm from "./BookForm";
import { useBookContext } from "../../hooks/UseBookContext";
import { useAddBookMutation } from "./mutations";
import { BookInfoType } from "../../lib/types";

type AddBookFormProps = {
  onClose: () => void;
};

function AddBookForm({ onClose }: AddBookFormProps) {
  const { bookInfo, onInputChange, clearInput } = useBookContext();

  const addBookMutation = useAddBookMutation();

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newData: BookInfoType = {
      ...bookInfo,
      classes: Number(bookInfo.classes),
      year: Number(bookInfo.year),
    };

    addBookMutation.mutate(newData);
    clearInput();
    onClose();
  };

  return (
    <BookForm
      name={bookInfo.name}
      classes={bookInfo.classes}
      year={bookInfo.year}
      writer={bookInfo.writer}
      publisher={bookInfo.publisher}
      formName="Add book"
      onChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
}

export default AddBookForm;
