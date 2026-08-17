import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 1. Import registerUser alongside loginUser
import { loginUser, registerUser } from "../../store/slices/authSlice";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { token, loading, error, user } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(
        loginUser({ email: formData.email, password: formData.password }),
      );
    } else {
      dispatch(registerUser(formData));
    }
  };

  // Toggle function to clear errors and form data when switching modes
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  // Redirect after successful login or registration
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-80px)] flex items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading dynamically changes */}
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">
            {isLogin ? "Buildie Login" : "Create Account"}
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isLogin
              ? "Login to manage your projects"
              : "Sign up to start estimating"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field  */}
          {!isLogin && (
            <div>
              <label className="block mb-2 text-sm font-medium dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button dynamically changes text */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/*  The Toggle Link at the bottom */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>

        {/* User */}
        {user && (
          <div className="text-center text-green-600 dark:text-green-400">
            Logged in as {user.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
