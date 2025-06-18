import React, { useState } from 'react';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthTest = () => {
    const [testResult, setTestResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testFirebaseConnection = async () => {
        setLoading(true);
        setTestResult('Тестування Firebase...');
        
        try {
            // Спроба створити тестового користувача
            const testEmail = `test${Date.now()}@example.com`;
            const testPassword = '123456';
            
            console.log('Testing Firebase with:', testEmail);
            
            const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
            console.log('Test user created:', userCredential.user);
            
            // Видалити тестового користувача
            await userCredential.user.delete();
            console.log('Test user deleted');
            
            setTestResult('✅ Firebase працює правильно!');
        } catch (error) {
            console.error('Firebase test error:', error);
            setTestResult(`❌ Помилка Firebase: ${error.code} - ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card max-w-md mx-auto mt-8 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Тест Firebase</h3>
            
            <button 
                onClick={testFirebaseConnection}
                disabled={loading}
                className="btn-primary w-full mb-4"
            >
                {loading ? 'Тестую...' : 'Тестувати Firebase'}
            </button>
            
            {testResult && (
                <div className={`p-4 rounded-lg ${testResult.includes('✅') ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <p className="text-white text-sm">{testResult}</p>
                </div>
            )}
            
            <div className="mt-4 text-white/60 text-xs">
                <p>Перевірка підключення до Firebase Authentication</p>
            </div>
        </div>
    );
};

export default AuthTest; 