import axios from "axios";

type LendInfoType = {
  bookId: number;
  memberId: number;
};

const api = axios.create({ baseURL: "http://localhost:5000/api/v1" });

export const fetchLendLists = () => api.get("/lend-lists");
export const addLendList = (lendInfo: LendInfoType) =>
  api.post("/lend-lists", lendInfo);
export const fetchLendList = (id: number) => api.get(`/lend-lists/${id}`);
export const fetchLendListByBookId = (id: number) =>
  api.get(`/lend-lists/books/${id}`);
export const updateLendListReturnDate = (id: number) =>
  api.patch(`/lend-lists/${id}/returned-date`);
export const deleteLendList = (id: number) => api.delete(`/lend-lists/${id}`);
