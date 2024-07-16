import LendListContextProvider from "../../contexts/LendListContext";
import FormButton from "../general/form/FormButton";
import FormInput from "../general/form/FormInput";
import LendList from "./LendList";

function Lend() {
  return (
    <>
      <LendListContextProvider>
        <h1 className="text-xl font-semibold mt-6 ml-6 py-5">Lending List</h1>
        <div className="flex gap-2 mx-6">
          <div className="flex-1">
            <FormInput placeholder="Member ID" />
          </div>
          <div className="flex-1">
            <FormInput placeholder="Book ID" />
          </div>
          <div className="flex-none w-[200px]">
            <FormButton name="Confirm" />
          </div>
        </div>
        <LendList />
      </LendListContextProvider>
    </>
  );
}

export default Lend;
