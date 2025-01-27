import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login");
            alert('Register success');
        } catch (error) {
            setError("Register failed. Please try again");
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleRegister}>
                <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block mb-2 p-2 border rounded w-full" 
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block mb-4 p-2 border rounded w-full" 
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default SignUp;