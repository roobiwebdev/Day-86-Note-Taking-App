import React from 'react'
import LoginForm from '../components/LoginForm'
import { useSelector } from 'react-redux'

const LoginPage = () => {

    const darkMode = useSelector((state) => state.theme.darkMode)
    return (
        <div className={`min-w-screen min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-slate-800' : 'bg-neutral-100'}`}>
            <LoginForm />
        </div>
    )
}

export default LoginPage