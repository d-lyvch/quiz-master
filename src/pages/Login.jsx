import { signInWithEmailAndPassword } from "firebase/auth";
import React,{ useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import AuthTest from "../components/AuthTest";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            console.log("Attempting to sign in with email:", email);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in successfully:", userCredential.user);
            navigate("/")
        } catch (error) {
            console.error("Login error:", error.code, error.message);
            let errorMessage = "Невірні дані для входу, спробуйте ще раз";
            
            // Більш детальні повідомлення про помилки
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "Користувача з таким email не знайдено";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Невірний пароль";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Невірний формат email";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Забагато спроб. Спробуйте пізніше";
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
                        <div className="w-28 h-28 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                            <span className="text-white font-bold text-4xl">Q</span>
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-4">
                            Вхід до акаунту
                        </h1>
                        <p className="text-white/70 text-xl">
                            Ласкаво просимо назад!
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="glass-card spacious-form slide-in-left">
                        <form onSubmit={handleLogin} className="space-y-8">
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
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="error-message fade-in">
                                    <span>⚠️ {error}</span>
                                </div>
                            )}

                            {/* Login Button */}
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-primary w-full relative overflow-hidden group"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <div className="loading-spinner"></div>
                                        <span>Входжу...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10">Увійти</span>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <div className="text-center">
                                    <span className="divider-text">або</span>
                                </div>
                            </div>

                            {/* Sign up link */}
                            <div className="text-center spacious-section">
                                <p className="text-white/70 text-lg">
                                    Немає акаунту?{' '}
                                    <Link 
                                        to="/signup" 
                                        className="font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300 text-xl"
                                    >
                                        Зареєструватися
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Firebase Test Component */}
                    <AuthTest />

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-white/50 text-sm">
                            Використовуючи Quiz Master, ви погоджуєтесь з нашими умовами
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;