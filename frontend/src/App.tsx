import Header from "./components/general/navbar/Header";
import "./App.css";
import Sidebar from "./components/general/navbar/Sidebar";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex mt-16">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <div className="w-full xl:mx-10">
            <Outlet />
          </div>
        </div>
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
    </>
  );
}

export default App;
