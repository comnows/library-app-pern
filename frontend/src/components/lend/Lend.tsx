import LendListContextProvider from "../../contexts/LendListContext";
import AddLendListForm from "./AddLendListForm";
import LendList from "./LendList";

function Lend() {
  return (
    <>
      <LendListContextProvider>
        <h1 className="text-xl font-semibold mt-6 ml-6 py-5">Lending List</h1>
        <AddLendListForm />
        <LendList />
      </LendListContextProvider>
    </>
  );
}

export default Lend;
