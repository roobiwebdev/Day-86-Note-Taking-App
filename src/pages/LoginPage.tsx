import React from 'react';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';

// Define the RootState interface to describe the structure of the Redux store
interface RootState {
  theme: {
    darkMode: boolean;
  };
}

const LoginPage: React.FC = () => {
  // Get darkMode from Redux state
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div
      className={`min-w-screen min-h-screen flex flex-col items-center justify-center ${
        darkMode ? 'bg-slate-800' : 'bg-neutral-100'
      }`}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
