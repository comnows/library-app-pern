import SidebarLink from "./SidebarLink";
import SidebarIcon from "./SidebarIcon";
import { IoPersonOutline, IoBookOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

type SidebarProps = {
  isSidebarOpen: boolean;
};

function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <div
      className={
        "fixed lg:sticky bg-white top-16 h-screen lg:h-[calc(100vh-5rem)] w-[240px] min-w-[240px] " +
        (isSidebarOpen
          ? "ml-0 visible transition-[margin_0.3s,visibility_0s] shadow-md"
          : "-ml-[240px] invisible transition-[margin_0.3s,visibility_0s_0.3s]")
      }
    >
      <div className="flex flex-col p-3">
        <SidebarLink path="/">
          <SidebarIcon>
            <FaList />
          </SidebarIcon>
          <p>Lend List</p>
        </SidebarLink>
        <SidebarLink path="/book">
          <SidebarIcon>
            <IoBookOutline />
          </SidebarIcon>
          <p>Book List</p>
        </SidebarLink>
        <SidebarLink path="/member">
          <SidebarIcon>
            <IoPersonOutline />
          </SidebarIcon>
          <p>Member List</p>
        </SidebarLink>
      </div>
    </div>
  );
}

export default Sidebar;
