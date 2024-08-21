import { useRef } from "react";
import AddMemberModal from "./AddMemberModal";
import MemberList from "./MemberList";
import MemberContextProvider from "../../contexts/MemberContext";

function Member() {
  const addModalRef = useRef<HTMLDialogElement | null>(null);
  const openAddModal = () => {
    addModalRef.current?.showModal();
  };

  const closeAddModal = () => {
    addModalRef.current?.close();
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
      <MemberList />
      <AddMemberModal onClose={closeAddModal} ref={addModalRef} />
    </MemberContextProvider>
  );
}

export default Member;
