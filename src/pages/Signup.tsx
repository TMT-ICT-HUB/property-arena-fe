import { useErrorHandler, useSignup } from "@/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const { signup, loading, error } = useSignup();
  const nav = useNavigate();
  const handleError = useErrorHandler();
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirm) {
      setFormError('Passwords must match');
      return;
    }

    try {
      await signup(fullname, email, password);
      nav('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = new Error(`Signup failed: ${err}`)
      if (err.status >= 400 && err.status < 500) {
        setFormError(err.message);
        return;
      }
      handleError(new Error(`Signup failed: ${err.message}`));
      // setFormError(err.message);
      return
    }
  };

  // Show either form validation error or server error
  const displayError = formError || error;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <label className="block mb-2">
          Name
          <input
            type="text"
            className="mt-1 w-full p-2 border rounded"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="email"
            className="mt-1 w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
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
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        <label className="block mb-4">
          Confirm Password
          <div className="flex items-center mt-1 border rounded overflow-hidden">
            <input
              type={showPassword ? "text" : "password"}
              className="flex-1 p-2 focus:outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="px-3"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </label>

        {displayError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{displayError}</span>
            </div>
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;