import React, { useState } from "react";
import quizzes from "../database/quizzes.json";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const Home = () => {
    const { currentUser } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleQuizClick = (e, quizId) => {
      if (!currentUser) {
        e.preventDefault();
        setShowAuthModal(true);
      }
    }


  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 py-6 mb-2">
        Available Quizzes
      </h1>

      <div className="flex-1 flex items-start justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-3 w-full">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${quiz.id}`}
                onClick={(e) => handleQuizClick(e,quiz.id)}
                className="block w-full  bg-white pt-3 pb-5 px-6 rounded-lg shadow-xl
                                       hover:shadow-2xl transition-all duration-300 
                                       border-2 border-transparent hover:border-blue-200
                                       transform hover:scale-[1.005]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-700 mt-1">
                    {quiz.title}
                  </span>
                  <span
                    className="text-sm text-gray-500 bg-blue-50 px-3 
                                py-1 rounded-full"
                  >
                    #ID-{quiz.id}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default Home;
