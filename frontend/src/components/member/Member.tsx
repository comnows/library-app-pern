import { useRef, useState } from "react";
import AddMemberModal from "./AddMemberModal";
import MemberList from "./MemberList";
import MemberContextProvider from "../../contexts/MemberContext";
import EditMemberModal from "./EditMemberModal";

function Member() {
  const addModalRef = useRef<HTMLDialogElement | null>(null);
  const editModalRef = useRef<HTMLDialogElement | null>(null);

  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const openAddModal = () => {
    addModalRef.current?.showModal();
  };

  const closeAddModal = () => {
    addModalRef.current?.close();
  };

  const openEditModal = (id: number) => {
    editModalRef.current?.showModal();
    setSelectedMember(id);
  };

  const closeEditModal = () => {
    setSelectedMember(-1);
    editModalRef.current?.close();
  };

  return (
    <MemberContextProvider>
      <h1 className="text-xl font-semibold mt-6 ml-6 py-5">Member List</h1>
      <div className="flex justify-center">
        <button
          onClick={openAddModal}
          className="bg-green-500 text-white font-semibold rounded-full hover:bg-green-500/90 active:bg-green-600/80 px-4 py-2"
        >
          Add new member
        </button>
      </div>
      <MemberList onEdit={openEditModal} />
      <AddMemberModal onClose={closeAddModal} ref={addModalRef} />
      <EditMemberModal
        selectedMember={selectedMember}
        onClose={closeEditModal}
        ref={editModalRef}
      />
    </MemberContextProvider>
  );
}

export default Member;
