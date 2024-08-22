import Header from "./components/general/navbar/Header";
import "./App.css";
import Sidebar from "./components/general/navbar/Sidebar";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Sidebar />
        <div className="mt-16 ml-[240px]">
          <Outlet />
        </div>
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
    </>
  );
}

export default App;
