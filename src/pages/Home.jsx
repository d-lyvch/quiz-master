import React, { useEffect, useState } from "react";
import quizzes from "../database/quizzes.json"
import { Link } from "react-router-dom";

const Home = () => {
    const [quizList, setQuizList] = useState([]);

    useEffect(() =>{
        setQuizList(quizzes)
    }, [])

    return (
        <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Hero Section */}
            <div className="perfect-center">
                <div className="content-center fade-in">
                    <div className="spacious-section">
                        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-8">
                            Ласкаво просимо до Quiz Master
                        </h1>
                        <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                            Перевірте свої знання з різноманітними квізами. Обирайте з широкого спектру тем 
                            та випробовуйте себе в захоплюючих інтелектуальних змаганнях!
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="spacious-section">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <div className="glass-card text-center slide-in-left">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <span className="text-4xl">🧠</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-4">{quizList.length}+</h3>
                                <p className="text-white/70 text-xl">Доступних квізів</p>
                            </div>
                            
                            <div className="glass-card text-center fade-in" style={{animationDelay: '0.2s'}}>
                                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <span className="text-4xl">🎯</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-4">∞</h3>
                                <p className="text-white/70 text-xl">Категорій знань</p>
                            </div>
                            
                            <div className="glass-card text-center slide-in-right">
                                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <span className="text-4xl">⚡</span>
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-4">Швидко</h3>
                                <p className="text-white/70 text-xl">Миттєві результати</p>
                            </div>
                        </div>
                    </div>

                    {/* Quiz List Section */}
                    <div className="spacious-section">
                        <h2 className="text-5xl font-bold text-white text-center mb-20">
                            Оберіть свій квіз
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
                            {quizList.map((quiz, index) => (
                                <Link 
                                    key={quiz.id}
                                    to={`/quiz/${quiz.id}`}
                                    className="quiz-card glass-card text-left"
                                    style={{animationDelay: `${index * 0.1}s`}}
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-2xl">
                                                {quiz.title.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-4xl">→</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors duration-300">
                                        {quiz.title}
                                    </h3>
                                    
                                    <p className="text-white/70 text-lg mb-8 line-clamp-2 leading-relaxed">
                                        {quiz.description || "Перевірте свої знання в цій захоплюючій темі!"}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm text-white/60">Запитань:</span>
                                            <span className="text-lg font-semibold text-white">
                                                {quiz.questions?.length || "N/A"}
                                            </span>
                                        </div>
                                        
                                        <div className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full">
                                            <span className="text-sm text-white/80 font-medium">
                                                Початковий
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="spacious-section">
                        <div className="glass-card max-w-4xl mx-auto text-center">
                            <h3 className="text-4xl font-bold text-white mb-8">
                                Готові почати?
                            </h3>
                            <p className="text-white/70 text-xl leading-relaxed mb-12">
                                Оберіть квіз вище та почніть своє інтелектуальне подорожнє прямо зараз!
                            </p>
                            <div className="flex items-center justify-center space-x-8">
                                <div className="w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
                                <div className="w-6 h-6 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-6 h-6 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;