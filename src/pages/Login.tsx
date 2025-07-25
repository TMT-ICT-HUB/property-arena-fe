import { useLogin } from "@/hooks";
import { useToast } from "@/hooks/useToast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Check if it's a network/system error (not form validation)
      if (err.message?.includes("Network") ||
        err.message?.includes("fetch") ||
        err.message?.includes("timeout") ||
        err.message?.includes("500") ||
        err.message?.includes("503")) {
        // Network or server errors show as toast
        toast.error("Something went wrong. Please try again.");
      }
      // Form-related errors (invalid credentials, etc.) will be shown via the error state
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white flex-col rounded shadow-md">
      <div className="bg-white p-8 shadow-2xl w-full max-w-md">

        <div className="logo h-12 justify-center flex items-center bg-white text-black p-8">
          <img
            src="https://res.cloudinary.com/dhhknhoo2/image/upload/v1751968463/property-arena/LOGO-2_jkdasi.jpg"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-extrabold text-primary-red">PropertyArena</span>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-white p-8  w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <label className="block mb-4">
            Email
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block mb-4 relative">
            Password
            <div className="flex items-center mt-1 border rounded overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 p-2 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="px-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-red text-white py-2 rounded hover:bg-secondary-red transition disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
