import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";

const Logout = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.log('Error signing out', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!currentUser) return null;

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Виходжу...</span>
                </>
            ) : (
                <>
                    <span>🚪</span>
                    <span>Вийти</span>
                </>
            )}
        </button>
    );
};

export default Logout;