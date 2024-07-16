import { useContext } from "react";
import { LendListContext } from "../contexts/LendListContext";

export const useLendListContext = () => useContext(LendListContext);
