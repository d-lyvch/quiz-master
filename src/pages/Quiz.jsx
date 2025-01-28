import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizzes from "../database/quizzes.json";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectOption, setSelectOptions] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShowModal(true);
    }
  }, [currentUser]);

  const quiz = quizzes.find((q) => q.id === parseInt(id));

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <p className="text-red-500">Quiz not found or no questions available</p>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  if (!currentQuestionData) {
    return <p className="text-red-500">This question does not exist.</p>;
  }

  const handleNext = () => {
    const isCorrect =
      String(currentQuestionData.correctAnswer) === String(selectOption);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectOptions(null);
    } else {
      navigate(`/result`, {
        state: {
          score: score + (isCorrect ? 1 : 0),
          total: quiz.questions.length,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectOptions(null);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{quiz.title}</h1>
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm text-gray-600">Score: {score}</span>
        </div>
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          {currentQuestionData?.question}
        </h2>
        <ul className="space-y-2">
          {currentQuestionData?.options.map((option, index) => (
            <li
              key={index}
              className={`bg-white shadow-md p-3 rounded-md hover:bg-gray-100 ${
                selectOption === option ? "bg-blue-100" : ""
              }`}
            >
              <label className="flex items-center text-gray-800">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectOption === option}
                  onChange={() => setSelectOptions(option)}
                  className="mr-3 accent-blue-500"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              currentQuestion === 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!selectOption}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              selectOption
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {currentQuestion < quiz.questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>

      {showModal && <AuthModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Quiz;
