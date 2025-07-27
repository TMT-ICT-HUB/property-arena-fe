// src/components/SideBar.tsx
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaListAlt,
  FaUsers,
  FaRegCreditCard,
  FaChartBar,
  FaUser,
  FaGlobe,
  FaEnvelope,
  FaHeart,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import { useAuthStore } from '@/store/authStore';

const tabs = [
  { name: 'Home', icon: <FaHome />, route: '/' },
  { name: 'Dashboard', icon: <FaTachometerAlt />, route: '/dashboard' },
  { name: 'Post a property', icon: <FaPlusCircle />, route: '/create-property' },
  { name: 'My Listing', icon: <FaListAlt />, route: '/my-listing' },
  { name: 'Manage leads', icon: <FaUsers />, route: '/manage-leads' },
  { name: 'Subscription', icon: <FaRegCreditCard />, route: '/subscription' },
  { name: 'Stats', icon: <FaChartBar />, route: '/stats' },
  { name: 'Profile', icon: <FaUser />, route: '/profile' },
  { name: 'My Website', icon: <FaGlobe />, route: '/my-website' },
  { name: 'My Messages', icon: <FaEnvelope />, route: '/messages' },
  { name: 'Favourites', icon: <FaHeart />, route: '/favourites' },  
];

type SideBarProps = {
  onClose?: () => void;
};

const SideBar: React.FC<SideBarProps> = ({onClose}) => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="bg-black w-64 text-white min-h-screen">
      <div className="flex justify-between items-center px-4 py-3 md:hidden">
        <span className="font-bold">Menu</span>
        <button onClick={onClose} className="text-white text-xl">
          ✕
        </button>
      </div>

      {/* <div className="logo h-12 mb-8 flex items-center bg-white text-black px-4">
        <img
          src="https://res.cloudinary.com/dhhknhoo2/image/upload/v1751968463/property-arena/LOGO-2_jkdasi.jpg"
          alt="Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-xl font-extrabold text-primary-red ml-2">PropertyArena</span>
      </div> */}
      <div className="logo h-12 mb-8 flex items-center bg-white text-black">
        <img
          src="https://res.cloudinary.com/dhhknhoo2/image/upload/v1751968463/property-arena/LOGO-2_jkdasi.jpg"
          alt="Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="text-xl font-extrabold text-primary-red">PropertyArena</span>
      </div>
      <div className="p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.route}
              to={tab.route}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 w-full rounded-md transition-colors
                ${isActive
                  ? 'bg-white text-black'
                  : 'hover:bg-gray-800 text-white'}`
              }
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-md text-white hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          <span className="text-sm font-medium">Signout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
