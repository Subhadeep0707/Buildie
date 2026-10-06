import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-1 min-h-[calc(100vh-80px)] flex items-center justify-center bg-transparent p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">
            Forgot Password
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 p-4 rounded-lg">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
