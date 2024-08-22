import SidebarLink from "./SidebarLink";
import SidebarIcon from "./SidebarIcon";
import { IoPersonOutline, IoBookOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

function Sidebar() {
  return (
    <div className="fixed bg-white left-0 inset-y-0 pt-16 w-[240px]">
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
