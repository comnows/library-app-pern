import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Book from "./components/book/Book.tsx";
import Lend from "./components/lend/Lend.tsx";

import "./index.css";
import Member from "./components/member/Member.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Lend />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/member",
        element: <Member />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
