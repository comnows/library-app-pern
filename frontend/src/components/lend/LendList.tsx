import { useState } from "react";
import { fetchLendLists } from "../../api";
import { formatDate } from "../../utils/DateFormat";
import UpdateButton from "./UpdateButton";
import DeleteButton from "../general/button/DeleteButton";
import ListPageButton from "../general/button/ListPageButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FetchQueriesType } from "../../lib/types";
import { useDeleteMutation } from "./mutations";

function LendList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [queryObject, setQueryObject] = useState<FetchQueriesType>({
    id: 0,
  });

  const { data } = useQuery({
    queryKey: ["lendLists", queryObject],
    queryFn: () => fetchLendLists(queryObject),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useDeleteMutation();

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handlePrevClick = async (id: number) => {
    setCurrentPage((current) => current - 1);
    setQueryObject({
      id: id,
      option: "prev",
    });
  };

  const handleNextClick = async (id: number) => {
    setCurrentPage((current) => current + 1);
    setQueryObject({
      id: id,
      option: "next",
    });
  };

  return (
    <div className="mx-6 mt-6">
      <table className="w-full rounded-t-xl overflow-hidden">
        <thead className="bg-green-500">
          <tr className="text-white text-left">
            <th className="py-3 px-5">No.</th>
            <th className="py-3 px-5">Book name</th>
            <th className="py-3 px-5">Member name</th>
            <th className="py-3 px-5">Lend date</th>
            <th className="py-3 px-5">Due date</th>
            <th className="py-3 px-5">Return date</th>
            <th className="py-3 px-5">Options</th>
          </tr>
        </thead>
        <tbody className="border">
          {data?.map((lendList) => {
            return (
              <tr key={lendList.id} className="border-b hover:bg-black/5">
                <td className="py-3 px-5">{lendList.id}</td>
                <td className="py-3 px-5">{lendList.book_name}</td>
                <td className="py-3 px-5">{`${lendList.first_name} ${lendList.last_name}`}</td>
                <td className="py-3 px-5">{formatDate(lendList.created_at)}</td>
                <td className="py-3 px-5">{formatDate(lendList.due_date)}</td>
                <td className="py-3 px-5">
                  {lendList.returned_date
                    ? formatDate(lendList.returned_date)
                    : "-"}
                </td>
                <td className="py-3 px-5">
                  {!lendList.returned_date && <UpdateButton id={lendList.id} />}
                  <DeleteButton onClick={() => handleDelete(lendList.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end gap-2 mt-2">
        {currentPage > 1 && (
          <ListPageButton
            name="Prev"
            onClick={() => {
              data && handlePrevClick(data[0].id);
            }}
          />
        )}
        {data && data[0].count && data[0].count > 5 && (
          <ListPageButton
            name="Next"
            onClick={() => {
              data && handleNextClick(data[data.length - 1].id);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LendList;
