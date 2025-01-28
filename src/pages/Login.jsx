import { signInWithEmailAndPassword } from "firebase/auth";
import React,{ useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
            alert('Login success');
        } catch (error) {
            setError("Invalid credentials, please try again");    
            console.log(error.message);
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h1>
                {error && <p className="text-red-500 text-sm mb-4"> {error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setEmail(e.target.value)
                    }}
                    className="block mb-2 p-2 border rounded w-full text-gray-700" 
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block mb-2 p-2 border rounded w-full text-gray-700" 
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-4">
                Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
        </div>
    </div>
    );
};

export default Login;