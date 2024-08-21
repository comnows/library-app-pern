import { forwardRef } from "react";
import Modal from "../general/modal/Modal";
import { useMemberContext } from "../../hooks/UseMemberContext";
import AddMemberForm from "./AddMemberForm";

type AddMemberModalProps = {
  onClose: () => void;
};

const AddMemberModal = forwardRef<HTMLDialogElement, AddMemberModalProps>(
  function AddMemberModal({ onClose }, ref) {
    const { clearInput } = useMemberContext();
    return (
      <Modal
        onClose={() => {
          onClose();
          clearInput();
        }}
        ref={ref}
      >
        <AddMemberForm onClose={onClose} />
      </Modal>
    );
  },
);

export default AddMemberModal;
