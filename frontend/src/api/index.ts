import axios from "axios";
import {
  LendInfoType,
  FetchQueriesType,
  LendListType,
  BookType,
  BookInfoType,
  MemberType,
  MemberInfoType,
} from "../lib/types";

const api = axios.create({
  baseURL: "https://library-pern-backend.vercel.app/api/v1",
});

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
export const addBook = (bookInfo: BookInfoType) => api.post("/books", bookInfo);
export const fetchBook = (id: number): Promise<BookInfoType> =>
  api.get(`/books/${id}`).then((response) => response.data.data.books[0]);
export const updateBook = (id: number, newData: BookInfoType) =>
  api.patch(`/books/${id}`, newData);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);

export const fetchMembers = ({
  id,
  option,
}: FetchQueriesType): Promise<MemberType> =>
  api
    .get("/members", { params: { id: id, option: option } })
    .then((response) => response.data.data.members);
export const addMember = (memberInfo: MemberInfoType) =>
  api.post("/members", memberInfo);
export const fetchMember = (id: number): Promise<MemberInfoType> =>
  api.get(`/members/${id}`).then((response) => response.data.data.members[0]);
export const updateMember = (id: number, newData: MemberInfoType) =>
  api.patch(`/members/${id}`, newData);
export const deleteMember = (id: number) => api.delete(`/members/${id}`);
