import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, deleteUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Grab user state from Redux
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Populate the form with current user data when the component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, token, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto flex items-start md:items-center justify-center bg-gray-100 dark:bg-[#12141c] p-6 py-12">
      <div className="w-full max-w-md bg-white dark:bg-[#232734] rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">User Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Update your details or delete your account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 p-4 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1d27] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1d27] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-300">
              New Password (Optional)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a1d27] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Delete Account Section */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Danger Zone
          </p>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 py-3 rounded-xl font-semibold transition border border-red-200 dark:border-red-900/50"
          >
            {loading ? "Processing..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
