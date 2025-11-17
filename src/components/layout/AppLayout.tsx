import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ChatBot from "../ChatBot";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <ChatBot />
    </div>
  );
};

export default AppLayout;
