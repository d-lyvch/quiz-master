import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../pages/Logout";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const {currentUser} = useAuth();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">Q</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Quiz Master
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        {currentUser ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {currentUser.email.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-white font-medium hidden md:block">
                                        {currentUser.email}
                                    </span>
                                </div>
                                <Logout />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <NavLink 
                                    to="/login"
                                    className={({ isActive }) => 
                                        `px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-white text-purple-600 shadow-lg' 
                                                : 'text-white hover:bg-white/20 hover:backdrop-blur-sm'
                                        }`
                                    }
                                >
                                    Увійти
                                </NavLink>
                                <NavLink 
                                    to="/signup"
                                    className={({ isActive }) => 
                                        `px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg' 
                                                : 'bg-gradient-to-r from-pink-500 to-violet-500 text-white hover:shadow-lg hover:scale-105'
                                        }`
                                    }
                                >
                                    Реєстрація
                                </NavLink>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;