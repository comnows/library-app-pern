import { useEffect } from "react";
import {
  deleteLendList,
  fetchLendLists,
  updateLendListReturnDate,
} from "../../api";
import { useLendListContext } from "../../hooks/UseLendListContext";
import { formatDate } from "../../utils/DateFormat";
import UpdateButton from "../general/form/UpdateButton";
import DeleteButton from "../general/form/DeleteButton";
import { LendListType } from "../../lib/types";

function LendList() {
  const { lendLists, setLendLists } = useLendListContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLendLists();

        setLendLists(response.data.data.lists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setLendLists]);

  const handleUpdateClick = async (id: number) => {
    try {
      const response = await updateLendListReturnDate(id);

      const updatedLendLists: LendListType = lendLists.map((lend) =>
        lend.id === id
          ? {
              ...lend,
              returned_date: response.data.data.lists[0].returned_date,
            }
          : lend,
      );

      setLendLists(updatedLendLists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await deleteLendList(id);
      setLendLists(
        lendLists.filter((lendList) => {
          return lendList.id !== id;
        }),
      );
    } catch (error) {
      console.error(error);
    }
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
          {lendLists &&
            lendLists.map((lendList) => {
              return (
                <tr key={lendList.id} className="border-b hover:bg-black/5">
                  <td className="py-3 px-5">{lendList.id}</td>
                  <td className="py-3 px-5">{lendList.book_name}</td>
                  <td className="py-3 px-5">{`${lendList.first_name} ${lendList.last_name}`}</td>
                  <td className="py-3 px-5">
                    {formatDate(lendList.created_at)}
                  </td>
                  <td className="py-3 px-5">{formatDate(lendList.due_date)}</td>
                  <td className="py-3 px-5">
                    {lendList.returned_date
                      ? formatDate(lendList.returned_date)
                      : "-"}
                  </td>
                  <td className="py-3 px-5">
                    <UpdateButton
                      onClick={() => handleUpdateClick(lendList.id)}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteClick(lendList.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default LendList;
