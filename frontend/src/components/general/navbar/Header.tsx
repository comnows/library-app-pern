import { FaBars } from "react-icons/fa6";

function Header() {
  return (
    <div className="fixed flex items-center bg-white h-16 top-0 inset-x-0 px-5 z-10">
      <div className="flex items-center gap-5">
        <button className="h-full text-2xl p-3 rounded-full hover:bg-black/5">
          <FaBars />
        </button>
        <p className="uppercase leading-4 text-left text-sm font-medium">
          The
          <br /> School
          <br /> Library
        </p>
      </div>
    </div>
  );
}

export default Header;
