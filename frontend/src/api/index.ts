import axios from "axios";
import {
  LendInfoType,
  FetchQueriesType,
  LendListType,
  BookType,
} from "../lib/types";

const api = axios.create({ baseURL: "http://localhost:5000/api/v1" });

export const fetchLendLists = ({
  id,
  option,
}: FetchQueriesType): Promise<LendListType> =>
  api
    .get("/lend-lists", { params: { id: id, option: option } })
    .then((response) => response.data.data.lists);
export const addLendList = (lendInfo: LendInfoType) =>
  api.post("/lend-lists", lendInfo);
export const fetchLendList = (id: number) => api.get(`/lend-lists/${id}`);
export const fetchLendListByBookId = (id: number) =>
  api.get(`/lend-lists/books/${id}`);
export const updateLendListReturnDate = (id: number) =>
  api.patch(`/lend-lists/${id}/returned-date`);
export const deleteLendList = (id: number) => api.delete(`/lend-lists/${id}`);

export const fetchBooks = ({
  id,
  option,
}: FetchQueriesType): Promise<BookType> =>
  api
    .get("/books", { params: { id: id, option: option } })
    .then((response) => response.data.data.books);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);
