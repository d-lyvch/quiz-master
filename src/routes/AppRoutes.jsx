import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import Quiz from "../pages/Quiz"
import Result from "../pages/Result"
import CookieParser from "../components/CookieParser"
import Header from "../components/Header"


const AppRoutes = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/SignUp" element={<SignUp />}/>
                <Route path="/quiz/:id" element={<Quiz />}/>
                <Route path="/result" element={<Result />}/>
            </Routes>
            <CookieParser />
        </Router>
    )
}

export default AppRoutes