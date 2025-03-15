import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import logo_white from '../assets/logo_white.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../store/store'; // Import store types

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector((state: RootState) => state.theme.darkMode);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password.length >= 8) {
            dispatch(login({ id: '1', email }));
            navigate('/Dashboard');
            toast.success('Login successful!');
        } else {
            toast.error('Invalid credentials, please try again!');
        }
    };

    return (
        <div
            className={`flex flex-col items-center p-12 md:w-[540px] w-[400px] ${darkMode ? 'bg-slate-950 border-slate-600' : 'bg-white border-neutral-200'
                } border rounded-xl shadow-sm`}>
            {!darkMode ? (
                <img src={logo} alt="logo" className="w-28" />
            ) : (
                <img src={logo_white} alt="logo" className="w-28" />
            )}
            <h1
                className={`text-2xl font-bold mt-5 tracking-wide ${darkMode ? 'text-white' : 'text-black'
                    }`}>
                Welcome to Note!
            </h1>
            <p
                className={`font-normal text-sm mt-2 ${darkMode ? 'text-slate-300' : 'text-neutral-600'
                    }`}>
                Please log in to continue
            </p>

            <form className="flex flex-col mt-10 w-full" onSubmit={handleSubmit}>
                <label
                    htmlFor="email"
                    className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-neutral-700'
                        }`}>
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    className={`border text-sm rounded-lg py-3 px-4 mt-1 ${darkMode ? 'bg-slate-950 text-white border-slate-600 placeholder-slate-400' : 'border-neutral-300 placeholder-neutral-500'
                        }`}
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label
                    htmlFor="password"
                    className={`font-medium text-sm mt-4 ${darkMode ? 'text-white' : 'text-neutral-700'
                        }`}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className={`border rounded-lg py-3 px-4 mt-1 text-sm ${darkMode ? 'bg-slate-950 text-white border-slate-600 placeholder-slate-400' : 'border-neutral-300 placeholder-neutral-500'
                        }`}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white text-base font-semibold rounded-lg py-3 px-4 mt-4">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
