import { useEffect } from "react";
import { fetchLendLists } from "../../api";
import { useLendListContext } from "../../hooks/UseLendListContext";
import { formatDate } from "../../utils/DateFormat";
import { LuFileClock } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

function LendList() {
  const { lendLists, setLendLists } = useLendListContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLendLists();
        console.log(response);

        setLendLists(response.data.data.lists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setLendLists]);

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
                    <button className="group bg-white hover:bg-green-500 border border-green-500 rounded p-1">
                      <LuFileClock className="text-green-500 group-hover:text-white text-xl" />
                    </button>
                    <button className="group bg-white hover:bg-red-600 border border-red-600 rounded p-1 ml-2">
                      <FaRegTrashCan className="text-red-600 group-hover:text-white text-xl" />
                    </button>
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
