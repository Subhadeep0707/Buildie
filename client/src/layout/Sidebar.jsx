import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const navClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className="
        w-64
        bg-white
        dark:bg-gray-800
        border-r
        border-gray-200
        dark:border-gray-700
        shadow-md
        min-h-screen
        p-4
        flex
        flex-col
        justify-between
      "
    >
      <div>
        {/* Logo */}
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Buildie</h2>

        {/* Navigation */}
        <nav className="space-y-2">
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
          {/* Login */}
          {!token && (
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {/* User Section */}
      {token && (
        <div className="mt-6 border-t border-gray-300 dark:border-gray-700 pt-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Logged in as
            </p>
            <p className="font-semibold dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              py-2
              rounded-xl
              transition
              font-medium
            "
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
