import React from "react";
import RegisterForm from "../features/auth/RegisterForm";
import LayoutWrapper from "../layout/LayoutWrapper";

const Register = () => {
    return (
        <LayoutWrapper>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
                <RegisterForm />
            </div>
        </LayoutWrapper>
    );
};

export default Register;
