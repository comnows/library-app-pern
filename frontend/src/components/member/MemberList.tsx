import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FetchQueriesType } from "../../lib/types";
import { fetchMembers } from "../../api";
import { formatDate } from "../../utils/DateFormat";
import ListPageButton from "../general/button/ListPageButton";
import { useDeleteMemberMutation } from "./mutations";
import DeleteButton from "../general/button/DeleteButton";
import EditButton from "../general/button/EditButton";

type MemberListProps = {
  onEdit: (id: number) => void;
};

function MemberList({ onEdit }: MemberListProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryObject, setQueryObject] = useState<FetchQueriesType>({
    id: 0,
  });

  const { data } = useQuery({
    queryKey: ["members", queryObject],
    queryFn: () => fetchMembers(queryObject),
    placeholderData: keepPreviousData,
  });

  const deleteMemberMutation = useDeleteMemberMutation();

  const handleDelete = (id: number) => {
    deleteMemberMutation.mutate(id);
  };

  const handlePrevClick = (id: number) => {
    setCurrentPage((current) => current - 1);
    setQueryObject({ id: id, option: "prev" });
  };

  const handleNextClick = (id: number) => {
    setCurrentPage((current) => current + 1);
    setQueryObject({ id: id, option: "next" });
  };

  return (
    <>
      <div className="mx-6 mt-6 overflow-auto">
        <table className="w-full rounded-t-xl overflow-hidden">
          <thead className="bg-green-500">
            <tr className="text-white text-left">
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">No.</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">ID</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">First name</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Last name</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">email</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Phone</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Gender</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Birthday</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Create at</th>
              <th className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">Options</th>
            </tr>
          </thead>
          <tbody className="border">
            {data?.map((member) => {
              return (
                <tr key={member.id} className="border-b hover:bg-black/5">
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.id}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.personal_id}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.first_name}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.last_name}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.email}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.phone_number}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {member.gender}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {formatDate(member.date_of_birth)}
                  </td>
                  <td className="py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    {formatDate(member.created_at)}
                  </td>
                  <td className="flex gap-2 py-2 lg:py-3 px-2 md:px-3 lg:px-5">
                    <EditButton
                      onClick={() => {
                        onEdit(member.id);
                      }}
                    />
                    <DeleteButton onClick={() => handleDelete(member.id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-2 mt-2 mx-6">
        {currentPage > 1 && (
          <ListPageButton
            name="Prev"
            onClick={() => data && handlePrevClick(data[0].id)}
          />
        )}
        {data && data[0].count && data[0].count > 15 && (
          <ListPageButton
            name="Next"
            onClick={() => data && handleNextClick(data[data.length - 1].id)}
          />
        )}
      </div>
    </>
  );
}

export default MemberList;
