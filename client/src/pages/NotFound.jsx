import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-sky-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white px-4 transition-all duration-500">

        <div className="text-8xl animate-bounce mb-6">🚫️</div>

            <h1 className="h-22 text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                404 - Page Not Found
            </h1>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl text-center">
                Oops! Looks like you took a wrong turn on the budget trail. This page doesn’t exist or has been moved.
            </p>

            <button
                onClick={handleGoHome}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full text-lg transition-transform transform hover:scale-105 hover:shadow-lg shadow-green-300 dark:shadow-green-700"
            >
                🏠 Go Back Home
            </button>
        </div>
    );
};

export default NotFound;
