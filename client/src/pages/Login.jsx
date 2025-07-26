import React from "react";
import LoginForm from "../features/auth/LoginForm";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-8">
            <LoginForm />
        </div>
    );
};

export default Login;
