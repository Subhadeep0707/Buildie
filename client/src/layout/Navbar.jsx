import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const TopNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const navClass = ({ isActive }) =>
    `px-5 py-2.5 rounded-xl transition font-medium text-base ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white dark:bg-[#1a1d27] border-b border-gray-200 dark:border-gray-800 shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* REDUCED GAP: Changed from gap-8 to gap-4[cite: 6] */}
      <div className="flex items-center gap-4">
        {/* Logo - Slightly larger to match new nav items */}
        <h2 className="text-2xl font-bold dark:text-blue-500 mr-4">Buildie</h2>

        {/* Navigation */}
        <div className="flex gap-2">
          <NavLink to="/" className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            Projects
          </NavLink>
          <NavLink to="/blog" className={navClass}>
            Blog
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            Settings
          </NavLink>
        </div>
      </div>

      {/* User Section & Actions */}
      <div className="flex items-center gap-4">
        {!token ? (
          <NavLink to="/login" className={navClass}>
            Login
          </NavLink>
        ) : (
          <>
            <div className="text-right hidden md:block">
              <p className="text-base font-semibold dark:text-white leading-tight">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
            <NavLink to="/profile" className={navClass}>
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl transition font-medium text-base"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
