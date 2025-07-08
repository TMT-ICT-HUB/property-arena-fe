import { FaBell, FaChevronDown } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="h-12 bg-black text-white px-6 shadow">
      <div className="flex justify-between items-center h-12">
        <div className="text-xl font-semibold"></div>

        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <button className="relative">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar + Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://i.pravatar.cc/300"
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <FaChevronDown className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
