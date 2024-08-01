// import { useState } from "react";
import { fetchLendLists } from "../../api";
// import { useLendListContext } from "../../hooks/UseLendListContext";
import { formatDate } from "../../utils/DateFormat";
import UpdateButton from "../general/form/UpdateButton";
import DeleteButton from "../general/form/DeleteButton";
// import ListPageButton from "./ListPageButton";
import { useQuery } from "@tanstack/react-query";

function LendList() {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalItems, setTotalItems] = useState<number>(0);
  // const { lendLists } = useLendListContext();

  const { data } = useQuery({
    queryKey: ["lendLists"],
    queryFn: fetchLendLists,
  });

  // const handlePrevClick = async (id: number) => {
  //   console.log(id);
  //   setCurrentPage((current) => current - 1);
  // };

  // const handleNextClick = async (id: number) => {
  //   console.log(id);
  //   setCurrentPage((current) => current + 1);
  // };

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
                  <DeleteButton id={lendList.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="flex justify-end gap-2 mt-2">
        {currentPage > 1 && (
          <ListPageButton
            name="Prev"
            onClick={() => handlePrevClick(lendLists[0].id)}
          />
        )}
        {totalItems > 20 && (
          <ListPageButton
            name="Next"
            onClick={() => handleNextClick(lendLists[lendLists.length - 1].id)}
          />
        )}
      </div> */}
    </div>
  );
}

export default LendList;
