import { useErrorHandler, useSignup } from "@/hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [userType, setUserType] = useState('user');
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

    const fullname = `${firstName.trim()} ${lastName.trim()}`;

    try {
      await signup(fullname, email, password, userType);
      nav('/');
    } catch (err: any) {
      const error = new Error(`Signup failed: ${err}`);
      if (err.status >= 400 && err.status < 500) {
        setFormError(err.message);
        return;
      }
      handleError(new Error(`Signup failed: ${err.message}`));
    }
  };

  const displayError = formError || error;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 shadow-2xl w-full max-w-xl rounded">
        <Link to="/" className="logo h-12 justify-center flex items-center bg-white text-black mb-4 hover:opacity-80 transition">
          <img
            src="https://res.cloudinary.com/dhhknhoo2/image/upload/v1751968463/property-arena/LOGO-2_jkdasi.jpg"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-xl font-extrabold text-primary-red ml-2">PropertyArena</span>
        </Link>

        <form onSubmit={onSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="w-full">
              First Name
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="w-full">
              Last Name
              <input
                type="text"
                className="mt-1 w-full p-2 border rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>

          {/* Email */}
          <label className="block">
            Email
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* User Type */}
          <div>
            <label className="block mb-2 font-medium">Select User Type</label>
            <div className="flex flex-wrap gap-2">
              {['user', 'agent', 'developer', 'landlord'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type)}
                  className={`flex-1 min-w-[100px] p-3 border rounded text-center font-semibold transition ${userType === type
                      ? 'bg-primary-red border-primary-red text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-primary-green'
                    }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="w-full">
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
            <label className="w-full">
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
                  className="px-3 text-gray-600 hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </label>
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{displayError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary-red text-white py-2 rounded hover:bg-secondary-red transition disabled:opacity-50"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>

          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
