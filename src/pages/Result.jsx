import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col justify-center items-center text-white">
      <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Your Result</h1>
        {score !== undefined && total !== undefined ? (
        <>
          <p className="text-lg text-center">
            You scored
            <span className="font-bold text-blue-600 text-2xl">
              {score}
            </span>{" "}
            out of{" "}
            <span className="font-bold text-blue-600 text-2xl">{total}</span>
          </p>
          <p className="text-center mt-4">
            {score === total ? "Perfect score! 🎉" : "You nothing"}
          </p>
        </>
        ) : (
          <p className="text-red-500 text-center">No result data available.</p>
        )}
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white w-full py-2 mt-6 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Result;
