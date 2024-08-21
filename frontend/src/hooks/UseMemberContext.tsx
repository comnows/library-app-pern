import { useContext } from "react";
import { MemberContext } from "../contexts/MemberContext";

export const useMemberContext = () => useContext(MemberContext);
