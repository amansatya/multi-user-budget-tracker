import React from "react";
import LoginForm from "../features/auth/LoginForm";
import LayoutWrapper from "../layout/LayoutWrapper";

const Login = () => {
    return (
        <LayoutWrapper>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 py-8">
                <LoginForm />
            </div>
        </LayoutWrapper>
    );
};

export default Login;
