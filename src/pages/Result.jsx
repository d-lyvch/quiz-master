import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, quizTitle } = location.state || {};

    if (score === undefined || total === undefined) {
        return (
            <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                <div className="perfect-center">
                    <div className="glass-card text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-white text-3xl">❌</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Дані недоступні</h1>
                        <p className="text-white/70 mb-6">Результати квізу не знайдено.</p>
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

    const percentage = Math.round((score / total) * 100);
    
    const getResultData = () => {
        if (percentage >= 90) {
            return {
                title: "Блискуче! 🎉",
                message: "Ви показали відмінні знання!",
                color: "from-green-400 to-emerald-500",
                bgColor: "bg-green-400/20",
                emoji: "🏆"
            };
        } else if (percentage >= 75) {
            return {
                title: "Чудово! 👏",
                message: "Дуже добрі результати!",
                color: "from-blue-400 to-cyan-500",
                bgColor: "bg-blue-400/20",
                emoji: "🥇"
            };
        } else if (percentage >= 60) {
            return {
                title: "Добре! 👍",
                message: "Непоганий результат, але можна краще!",
                color: "from-yellow-400 to-orange-500",
                bgColor: "bg-yellow-400/20",
                emoji: "🥈"
            };
        } else if (percentage >= 40) {
            return {
                title: "Можна краще 🤔",
                message: "Варто попрактикуватися ще трохи!",
                color: "from-orange-400 to-red-500",
                bgColor: "bg-orange-400/20",
                emoji: "🥉"
            };
        } else {
            return {
                title: "Не засмучуйтесь! 💪",
                message: "Кожна спроба - це крок до успіху!",
                color: "from-red-400 to-pink-500",
                bgColor: "bg-red-400/20",
                emoji: "📚"
            };
        }
    };

    const resultData = getResultData();

    return (
        <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="perfect-center">
                <div className="w-full max-w-4xl mx-auto spacious-container">
                    
                    {/* Header */}
                    <div className="text-center spacious-section fade-in">
                        <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <span className="text-white font-bold text-3xl">🏁</span>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
                            Квіз завершено!
                        </h1>
                        <p className="text-white/70 text-xl">
                            {quizTitle && `Квіз: ${quizTitle}`}
                        </p>
                    </div>

                    {/* Result Card */}
                    <div className="glass-card spacious-form slide-in-left text-center">
                        
                        {/* Result Icon & Title */}
                        <div className="mb-8">
                            <div className={`w-32 h-32 bg-gradient-to-r ${resultData.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse`}>
                                <span className="text-white text-6xl">{resultData.emoji}</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4">
                                {resultData.title}
                            </h2>
                            <p className="text-white/70 text-xl">
                                {resultData.message}
                            </p>
                        </div>

                        {/* Score Display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className={`glass-card ${resultData.bgColor} p-6`}>
                                <p className="text-white/70 text-sm mb-2">Правильних відповідей</p>
                                <p className="text-4xl font-bold text-white">
                                    {score}
                                </p>
                            </div>
                            
                            <div className={`glass-card ${resultData.bgColor} p-6`}>
                                <p className="text-white/70 text-sm mb-2">Загальна кількість</p>
                                <p className="text-4xl font-bold text-white">
                                    {total}
                                </p>
                            </div>
                            
                            <div className={`glass-card ${resultData.bgColor} p-6`}>
                                <p className="text-white/70 text-sm mb-2">Відсоток</p>
                                <p className="text-4xl font-bold text-white">
                                    {percentage}%
                                </p>
                            </div>
                        </div>

                        {/* Detailed Score */}
                        <div className="mb-8">
                            <div className="progress-bar max-w-md mx-auto mb-4">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-white/70 text-lg">
                                Ви відповіли правильно на{' '}
                                <span className="font-bold text-white">{score}</span> з{' '}
                                <span className="font-bold text-white">{total}</span> запитань
                            </p>
                        </div>

                        {/* Achievement Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                            {percentage >= 100 && (
                                <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                                    <span className="text-white font-semibold text-sm">🏆 Ідеальний результат</span>
                                </div>
                            )}
                            {percentage >= 90 && (
                                <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full">
                                    <span className="text-white font-semibold text-sm">⭐ Відмінник</span>
                                </div>
                            )}
                            {percentage >= 75 && (
                                <div className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full">
                                    <span className="text-white font-semibold text-sm">🎯 Високий результат</span>
                                </div>
                            )}
                            {score > 0 && (
                                <div className="px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                                    <span className="text-white font-semibold text-sm">💪 Учасник</span>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="btn-primary px-8 py-4 text-lg font-semibold flex items-center space-x-3"
                            >
                                <span>🏠</span>
                                <span>Повернутися додому</span>
                            </button>
                            
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-secondary px-8 py-4 text-lg font-semibold flex items-center space-x-3"
                            >
                                <span>🔄</span>
                                <span>Пройти ще раз</span>
                            </button>
                        </div>
                    </div>

                    {/* Motivational Quote */}
                    <div className="text-center spacious-section">
                        <div className="glass-card max-w-2xl mx-auto p-8">
                            <p className="text-white/80 text-lg italic leading-relaxed">
                                {percentage >= 80 
                                    ? "«Знання - це сила, а ви показали справжню силу!»" 
                                    : "«Кожна помилка - це можливість навчитися чомусь новому.»"
                                }
                            </p>
                            <p className="text-white/60 text-sm mt-4">— Quiz Master</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;