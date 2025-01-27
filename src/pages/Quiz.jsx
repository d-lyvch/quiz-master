import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizzes from "../database/quizzes.json";

const Quiz = () => {
  const { id } = useParams();
  const quiz = quizzes.find((q) => q.id === parseInt(id));
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectOption, setSelectOptions] = useState(null);

  useEffect(() => {
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      console.error("No quiz or questions found for id:", id);
      navigate("/error"); // Направляємо на сторінку з помилкою
    }
  }, [quiz, id, navigate]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <p className="text-red-500">Quiz not found or no questions available</p>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  console.log(currentQuestionData);

  const handleNext = () => {
    const isCorrect =
      String(currentQuestionData.correctAnswer) === String(selectOption);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectOptions(null);
    } else {
      navigate(`/result`, { state: { score: score + (isCorrect ? 1 : 0), total: quiz.questions.length } });
    }
  };

  console.log("Selected Option:", selectOption);
  console.log("Correct Answer:", currentQuestionData.correctAnswer);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          {currentQuestionData?.question}
        </h2>
        <ul>
          {currentQuestionData?.options.map((option, index) => (
            <li key={index} className="mb-2">
              <label className="flex item-center">
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectOption === option}
                  onChange={() => setSelectOptions(option)}
                  className="mr-2"
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleNext}
        disabled={!selectOption}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {currentQuestion < quiz.questions.length - 1 ? "Next" : "Finish"}
      </button>
    </div>
  );
};

export default Quiz;
