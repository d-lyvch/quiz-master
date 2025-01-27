import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const {currentUser} = useAuth();

    return (
        <header className="flex justify-between p-4 bg-blue-500 text-white">
            <h1 className="text-xl">Quiz-Master</h1>
            <nav>
                {currentUser ? (
                    <>
                    <span>Welcome, {currentUser.email}</span>
                    <Logout />
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;