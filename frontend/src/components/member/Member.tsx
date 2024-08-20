import MemberList from "./MemberList";

function Member() {
  const openAddModal = () => {};

  return (
    <>
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
    </>
  );
}

export default Member;
