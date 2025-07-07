import SideBar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import React from "react";


interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div style={{ display: "flex", height: "100vh" }}>
    <SideBar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Topbar />
      <main style={{ flex: 1, padding: "1rem" }}>
        {children}
      </main>
    </div>
  </div>
);

export default MainLayout;
