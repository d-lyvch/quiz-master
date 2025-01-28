import React from "react";
import { Link } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md z-0"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Authorization Required
        </h2>
        <p className="mb-4 text-gray-600 text-center">
          You need to log in to access this quiz. Please log in or sign up to
          continue.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            to="login"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Log In
          </Link>
          <Link
            to="signup"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
