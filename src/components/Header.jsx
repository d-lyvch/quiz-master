import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuth();

  const getNavLinkClasses = (isActive) => 
    `px-4 py-2 rounded-lg border-2 transition-all duration-300
    ${
      isActive
        ? "bg-green-500 text-white border-green-600"
        : "bg-green-400 text-white border-green-500"
    } hover:bg-green-600 hover:border-green-700 active:bg-green-700 active:border-green-800 cursor-pointer`;
    

  return (
    <header className="flex justify-between items-center p-4 bg-blue-500 text-white">
      <h1 className="text-xl font-bold">
        <Link
          to="/"
          className="text-green-500 font-bold text-xl hover:text-green-600 active:text-green-700 transition-all duration-300"
        >
          Quiz-Master
        </Link>
      </h1>
      <nav>
        {currentUser ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {currentUser.email}</span>
            <Logout />
          </div>
        ) : (
          <div className="flex gap-6">
            <NavLink
              to="/login"
              className={({ isActive }) => getNavLinkClasses(isActive)}
              aria-label="Login"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) => getNavLinkClasses(isActive)}
              aria-label="Sign Up"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
