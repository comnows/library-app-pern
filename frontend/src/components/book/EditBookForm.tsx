import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../../api";
import BookForm from "./BookForm";
import { useEffect } from "react";
import { BookInfoFormType, BookInfoType } from "../../lib/types";
import { useUpdateBookMutation } from "./mutations";
import { useBookContext } from "../../hooks/UseBookContext";

type EditBookFormProps = {
  id: number;
  onClose: () => void;
};

function EditBookForm({ id, onClose }: EditBookFormProps) {
  const { bookInfo, setBookInfo, onInputChange, clearInput } = useBookContext();

  const { data } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    enabled: id > -1,
  });

  const updateBookMutation = useUpdateBookMutation();

  useEffect(() => {
    if (data) {
      const newData: BookInfoFormType = {
        ...data,
        classes: `${data?.classes}`,
        year: `${data?.year}`,
      };
      setBookInfo(newData);
    }
  }, [data, setBookInfo]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newData: BookInfoType = {
      ...bookInfo,
      year: Number(bookInfo.year),
    };

    updateBookMutation.mutate({ id, newData });
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
      formName="Edit book"
      onChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
}

export default EditBookForm;
