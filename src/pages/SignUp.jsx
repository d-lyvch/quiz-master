import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Password validation
        if (password !== confirmPassword) {
            setError("Паролі не співпадають");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Пароль повинен містити мінімум 6 символів");
            setLoading(false);
            return;
        }

        try {
            console.log("Attempting to create user with email:", email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created successfully:", userCredential.user);
            navigate("/");
        } catch (error) {
            console.error("Registration error:", error.code, error.message);
            let errorMessage = "Помилка реєстрації. Спробуйте ще раз";
            
            // Більш детальні повідомлення про помилки
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Цей email вже використовується";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Невірний формат email";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Пароль занадто слабкий";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Проблеми з мережею. Перевірте підключення";
                    break;
                default:
                    errorMessage = `Помилка: ${error.message}`;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="perfect-center">
                <div className="w-full max-w-lg mx-auto spacious-container">
                    {/* Logo Section */}
                    <div className="text-center spacious-section fade-in">
                        <div className="w-28 h-28 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <span className="text-white font-bold text-4xl">Q</span>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent mb-4">
                            Створити акаунт
                        </h1>
                        <p className="text-white/70 text-xl">
                            Приєднуйтесь до Quiz Master!
                        </p>
                    </div>

                    {/* Registration Form */}
                    <div className="glass-card spacious-form slide-in-right">
                        <form onSubmit={handleRegister} className="space-y-8">
                            {/* Email Field */}
                            <div className="form-section">
                                <label className="form-label">
                                    📧 Email адреса
                                </label>
                                <div className="input-with-icon">
                                    <input 
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input-field" 
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="form-section">
                                <label className="form-label">
                                    🔒 Пароль
                                </label>
                                <div className="input-with-icon relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field pr-14" 
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 text-xl"
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                <p className="text-white/50 text-sm mt-2">Мінімум 6 символів</p>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-section">
                                <label className="form-label">
                                    🔐 Підтвердіть пароль
                                </label>
                                <div className="input-with-icon relative">
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="input-field pr-14" 
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 text-xl"
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="error-message fade-in">
                                    <span>⚠️ {error}</span>
                                </div>
                            )}

                            {/* Register Button */}
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-secondary w-full relative overflow-hidden group"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="loading-spinner"></div>
                                        <span>Реєструю...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10">Зареєструватися</span>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>

                            {/* Terms */}
                            <div className="text-center spacious-section">
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Реєструючись, ви погоджуєтесь з нашими{' '}
                                    <span className="text-pink-300 hover:text-pink-200 cursor-pointer underline">
                                        Умовами використання
                                    </span>
                                    {' '}і{' '}
                                    <span className="text-pink-300 hover:text-pink-200 cursor-pointer underline">
                                        Політикою конфіденційності
                                    </span>
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="divider">
                                <div className="text-center">
                                    <span className="divider-text">або</span>
                                </div>
                            </div>

                            {/* Login link */}
                            <div className="text-center spacious-section">
                                <p className="text-white/70 text-lg">
                                    Вже маєте акаунт?{' '}
                                    <Link 
                                        to="/login" 
                                        className="font-medium bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent hover:from-pink-300 hover:to-purple-300 transition-all duration-300 text-xl"
                                    >
                                        Увійти
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-white/50 text-sm">
                            Безпечна реєстрація з шифруванням даних
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;