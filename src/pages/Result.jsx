import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total } = location.state || {}


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Result</h1>
            {score !== undefined && total !== undefined ? (
                <p className="text-lg">
                    You scored <span className="font-bold">{score}</span> out of{" "}
                    <span className="font-bold">{total}</span>
                </p>
            ): (
                <p className="text-red-500">No result data available.</p>
            )}
            <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Back to Home
            </button>
        </div>
    );
};

export default Result;