import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../../api";
import BookForm from "./BookForm";
import { useEffect, useState } from "react";
import { BookInfoFormType, BookInfoType } from "../../lib/types";
import { useUpdateBookMutation } from "./mutations";

type EditBookFormProps = {
  id: number;
};

function EditBookForm({ id }: EditBookFormProps) {
  const [bookInfo, setBookInfo] = useState<BookInfoFormType>({
    name: "",
    classes: "",
    year: "",
    writer: "",
    publisher: "",
  });

  const { data } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
  });

  const updateBookMutation = useUpdateBookMutation();

  useEffect(() => {
    const newData: BookInfoFormType = {
      ...data,
      classes: `${data?.classes}`,
      year: `${data?.year}`,
    };
    setBookInfo(newData);
  }, [data]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setBookInfo((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    console.log(bookInfo);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newData: BookInfoType = {
      ...bookInfo,
      classes: Number(bookInfo.classes),
      year: Number(bookInfo.year),
    };

    updateBookMutation.mutate({ id, newData });
  };

  return (
    <BookForm
      name={bookInfo.name}
      classes={bookInfo.classes}
      year={bookInfo.year}
      writer={bookInfo.writer}
      publisher={bookInfo.publisher}
      onChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
}

export default EditBookForm;
