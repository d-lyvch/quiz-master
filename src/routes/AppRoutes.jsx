import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Quiz from "../pages/Quiz"
import Result from "../pages/Result"
import CookieParser from "../components/CookieParser"
import Header from "../components/Header"

// Компонент защищенного маршрута
const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
};

// Компонент для авторизованных пользователей (перенаправление с логина)
const AuthRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" /> : children;
};

const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                {/* Защищенные маршруты */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }/>
                <Route path="/quiz/:id" element={
                    <ProtectedRoute>
                        <Quiz />
                    </ProtectedRoute>
                }/>
                <Route path="/result" element={
                    <ProtectedRoute>
                        <Result />
                    </ProtectedRoute>
                }/>
                
                {/* Публичные маршруты (только для неавторизованных) */}
                <Route path="/login" element={
                    <AuthRoute>
                        <Login />
                    </AuthRoute>
                }/>
                <Route path="/SignUp" element={
                    <AuthRoute>
                        <SignUp />
                    </AuthRoute>
                }/>
            </Routes>
            <CookieParser />
        </Router>
    )
}

export default AppRoutes