import { Link } from "react-router-dom";
import { ChildrenType } from "../../../lib/types";

type SidebarLinkProps = ChildrenType & {
  path: string;
};

function SidebarLink({ children, path }: SidebarLinkProps) {
  return (
    <Link
      to={path}
      className="flex items-center gap-6 text-sm w-full h-10 px-5 rounded-lg hover:bg-black/5"
    >
      {children}
    </Link>
  );
}

export default SidebarLink;
