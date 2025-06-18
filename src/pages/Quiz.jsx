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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      console.error("No quiz or questions found for id:", id);
      navigate("/"); // Направляємо на головну сторінку
    }
  }, [quiz, id, navigate]);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="perfect-center">
          <div className="glass-card text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-3xl">❌</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Квіз не знайдено</h1>
            <p className="text-white/70 mb-6">Вибачте, цей квіз недоступний або не містить запитань.</p>
            <button 
              onClick={() => navigate("/")}
              className="btn-primary"
            >
              Повернутися додому
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleNext = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const isCorrect =
        String(currentQuestionData.correctAnswer) === String(selectOption);

      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }

      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectOptions(null);
      } else {
        navigate(`/result`, { 
          state: { 
            score: score + (isCorrect ? 1 : 0), 
            total: quiz.questions.length,
            quizTitle: quiz.title
          } 
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const getScoreColor = () => {
    const percentage = (score / (currentQuestion + 1)) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="perfect-center">
        <div className="w-full max-w-4xl mx-auto spacious-container">
          
          {/* Quiz Header */}
          <div className="text-center spacious-section fade-in">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {quiz.title.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {quiz.title}
                </h1>
                <p className="text-white/70 text-lg">
                  Питання {currentQuestion + 1} з {quiz.questions.length}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-bar mb-8">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="glass-card p-4 min-w-[120px]">
                <p className="text-white/70 text-sm mb-1">Поточний рахунок</p>
                <p className={`text-2xl font-bold ${getScoreColor()}`}>
                  {score}/{currentQuestion + 1}
                </p>
              </div>
              <div className="glass-card p-4 min-w-[120px]">
                <p className="text-white/70 text-sm mb-1">Прогрес</p>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </div>

          {/* Question Section */}
          <div className="glass-card spacious-form slide-in-left">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">?</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-relaxed">
                {currentQuestionData?.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestionData?.options.map((option, index) => (
                <label 
                  key={index} 
                  className={`
                    block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02]
                    ${selectOption === option 
                      ? 'border-blue-400 bg-blue-400/20 shadow-lg shadow-blue-400/20' 
                      : 'border-white/20 bg-white/10 hover:border-white/40 hover:bg-white/20'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                      ${selectOption === option 
                        ? 'border-blue-400 bg-blue-400' 
                        : 'border-white/40'
                      }
                    `}>
                      {selectOption === option && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                    <span className="text-white text-lg font-medium flex-1">
                      {option}
                    </span>
                    <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300
                      ${selectOption === option 
                        ? 'bg-blue-400 text-white' 
                        : 'bg-white/20 text-white/60'
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectOption === option}
                    onChange={() => setSelectOptions(option)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-medium"
              >
                ← Вийти з квізу
              </button>

              <button
                onClick={handleNext}
                disabled={!selectOption || isLoading}
                className={`
                  btn-primary px-8 py-4 text-lg font-semibold flex items-center space-x-3
                  ${!selectOption ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                `}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Обробка...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentQuestion < quiz.questions.length - 1 ? "Наступне питання" : "Завершити квіз"}
                    </span>
                    <span className="text-xl">
                      {currentQuestion < quiz.questions.length - 1 ? "→" : "🏁"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="text-center spacious-section">
            <div className="flex items-center justify-center space-x-2">
              {quiz.questions.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index === currentQuestion 
                      ? 'bg-blue-400 scale-125' 
                      : index < currentQuestion 
                        ? 'bg-green-400' 
                        : 'bg-white/30'
                    }
                  `}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm mt-4">
              Поточне питання виділено синім • Пройдені питання зелені
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
