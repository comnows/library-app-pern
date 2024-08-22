import { useQuery } from "@tanstack/react-query";
import { EditFormProps } from "../../lib/types";
import { fetchMember } from "../../api";
import { useEffect } from "react";
import { useMemberContext } from "../../hooks/UseMemberContext";
import MemberForm from "./MemberForm";
import { useUpdateMemberMutation } from "./mutations";

function EditMemberForm({ id, onClose }: EditFormProps) {
  const { memberInfo, setMemberInfo, clearInput } = useMemberContext();

  const { data } = useQuery({
    queryKey: ["member", id],
    queryFn: () => fetchMember(id),
    enabled: id > -1,
  });

  const updateMemberMutation = useUpdateMemberMutation();

  useEffect(() => {
    if (data) {
      setMemberInfo(data);
    }
  }, [data, setMemberInfo]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    updateMemberMutation.mutate({ id, newData: memberInfo });
    clearInput();
    onClose();
  };

  return (
    <MemberForm
      formName="Edit member"
      personal_id={memberInfo.personal_id}
      first_name={memberInfo.first_name}
      last_name={memberInfo.last_name}
      email={memberInfo.email}
      phone_number={memberInfo.phone_number}
      gender={memberInfo.gender}
      date_of_birth={memberInfo.date_of_birth}
      onSubmit={onSubmit}
    />
  );
}

export default EditMemberForm;
