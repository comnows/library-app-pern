import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api";
import { FetchQueriesType } from "../../lib/types";
import { formatDate } from "../../utils/DateFormat";
import { useDeleteBookMutation } from "./mutations";
import EditButton from "../general/button/EditButton";
import DeleteButton from "../general/button/DeleteButton";

function BookList() {
  const [queryObject, setQueryObject] = useState<FetchQueriesType>({
    id: 0,
  });

  const { data } = useQuery({
    queryKey: ["books", queryObject],
    queryFn: () => fetchBooks(queryObject),
    placeholderData: keepPreviousData,
  });

  const deleteBookMutation = useDeleteBookMutation();

  const handleDelete = (id: number) => {
    deleteBookMutation.mutate(id);
  };

  return (
    <div className="mx-6 mt-6">
      <table className="w-full rounded-t-xl overflow-hidden">
        <thead className="bg-green-500">
          <tr className="text-white text-left">
            <th className="py-3 px-5">No.</th>
            <th className="py-3 px-5">Book name</th>
            <th className="py-3 px-5">Classes name</th>
            <th className="py-3 px-5">Year</th>
            <th className="py-3 px-5">Writer</th>
            <th className="py-3 px-5">Publisher</th>
            <th className="py-3 px-5">Create at</th>
            <th className="py-3 px-5">Options</th>
          </tr>
        </thead>
        <tbody className="border">
          {data?.map((book) => {
            return (
              <tr key={book.id} className="border-b hover:bg-black/5">
                <td className="py-3 px-5">{book.id}</td>
                <td className="py-3 px-5">{book.name}</td>
                <td className="py-3 px-5">{`${book.class_name}`}</td>
                <td className="py-3 px-5">{book.year}</td>
                <td className="py-3 px-5">{book.writer}</td>
                <td className="py-3 px-5">{book.publisher}</td>
                <td className="py-3 px-5">{formatDate(book.create_at)}</td>
                <td className="flex gap-2 py-3 px-5">
                  <EditButton onClick={() => {}} />
                  <DeleteButton onClick={() => handleDelete(book.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 mt-2">
        <button onClick={() => setQueryObject({ id: 0, option: "prev" })}>
          Prev
        </button>
        <button onClick={() => setQueryObject({ id: 0, option: "next" })}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
