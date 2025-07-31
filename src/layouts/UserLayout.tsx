import NavBar from "@/components/NavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

// const SIDEBAR_WIDTH = "16rem"; // 64 Tailwind = 256px

const UserLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="flex h-screen">
    {/* Fixed Sidebar */}
    <div
      className="h-screen z-20"
    // style={{ width: SIDEBAR_WIDTH }}
    >
      {/* <SideBar /> */}
    </div>

    {/* Main Content Area shifted right */}
    <div
      className="flex flex-col w-full px-24"
    // style={{ marginLeft: SIDEBAR_WIDTH }}
    >
      <NavBar />
      <main className="flex-1 overflow-y-auto bg-gray-50 mt-16">
        {children}
      </main>
    </div>
  </div>
);

export default UserLayout;
