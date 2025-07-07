// src/components/SideBar.tsx
import { NavLink } from 'react-router-dom';
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
  { name: 'Signout', icon: <FaSignOutAlt />, route: '/signout' },
];

const SideBar: React.FC = () => {
  return (
    <div className="bg-black w-64 text-white min-h-screen p-4">
      <div className="logo h-32 mb-8">
        {/* your logo here */}
      </div>
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
    </div>
  );
};

export default SideBar;
