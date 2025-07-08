import SideBar from "@/components/SideBar";
import Topbar from "@/components/TopBar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = "16rem"; // 64 Tailwind = 256px

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="flex h-screen">
    {/* Fixed Sidebar */}
    <div
      className="fixed top-0 left-0 h-screen z-20"
      style={{ width: SIDEBAR_WIDTH }}
    >
      <SideBar />
    </div>

    {/* Main Content Area shifted right */}
    <div
      className="flex flex-col ml-64 w-full"
      style={{ marginLeft: SIDEBAR_WIDTH }}
    >
      <Topbar />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
