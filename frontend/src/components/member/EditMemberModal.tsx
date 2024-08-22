import { forwardRef } from "react";
import { useMemberContext } from "../../hooks/UseMemberContext";
import Modal from "../general/modal/Modal";
import EditMemberForm from "./EditMemberForm";

type EditMemberModalProps = {
  selectedMember: number | null;
  onClose: () => void;
};
const EditMemberModal = forwardRef<HTMLDialogElement, EditMemberModalProps>(
  function EditMemberModal({ selectedMember, onClose }, ref) {
    const { clearInput } = useMemberContext();

    return (
      <Modal
        onClose={() => {
          onClose();
          clearInput();
        }}
        ref={ref}
      >
        {selectedMember && (
          <EditMemberForm id={selectedMember} onClose={onClose} />
        )}
      </Modal>
    );
  },
);

export default EditMemberModal;
