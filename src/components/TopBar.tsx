import { FaBell, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Topbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => setIsModalOpen((prev) => !prev);
  const closeDropdown = () => setIsModalOpen(false);

  return (
    <div className="h-12 bg-black text-white px-6 shadow relative z-50">
      <div className="flex justify-between items-center h-12">
        <div className="text-xl font-semibold"></div>

        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <button className="relative">
                <FaBell className="text-xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src="https://i.pravatar.cc/300"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <FaChevronDown className="text-sm" />
                </div>

                {isModalOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg p-4 z-50">
                    <div className="mb-2">
                      <p className="text-lg font-semibold">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>

                    <hr className="my-2" />

                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/profile"
                        onClick={closeDropdown}
                        className="hover:bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          closeDropdown();
                        }}
                        className="text-left text-sm text-red-600 hover:bg-gray-100 px-2 py-1 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm bg-white text-black px-4 py-1 rounded hover:bg-gray-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Click outside to close modal (optional enhancement) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdown}
        />
      )}
    </div>
  );
};

export default Topbar;
