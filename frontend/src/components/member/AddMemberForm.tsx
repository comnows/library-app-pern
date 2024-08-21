import { useMemberContext } from "../../hooks/UseMemberContext";
import MemberForm from "./MemberForm";
import { useAddMemberMutation } from "./mutations";

type AddMemberFormProps = {
  onClose: () => void;
};

function AddMemberForm({ onClose }: AddMemberFormProps) {
  const { memberInfo, clearInput } = useMemberContext();

  const addMemberMutation = useAddMemberMutation();

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    addMemberMutation.mutate(memberInfo);

    clearInput();
    onClose();
  };

  return (
    <MemberForm
      formName="Add member"
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

export default AddMemberForm;
