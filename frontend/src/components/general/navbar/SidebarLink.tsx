import { ChildrenType } from "../../../lib/types";

function SidebarLink({ children }: ChildrenType) {
  return (
    <a className="flex items-center gap-6 text-sm w-full h-10 px-5 rounded-lg hover:bg-black/5">
      {children}
    </a>
  );
}

export default SidebarLink;
