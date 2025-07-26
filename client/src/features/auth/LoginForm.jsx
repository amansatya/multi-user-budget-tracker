import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const LoginForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("❌ Password must be at least 6 characters long");
            return;
        }

        if (email === "demo@user.com" && password === "password") {
            navigate("/dashboard");
        } else {
            setError("❌ Wrong email or password");
        }
    };


    return (
        <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-center mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Login
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
                Welcome back! Please enter your credentials to continue.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                        placeholder="Enter your password"
                    />
                    <div className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-2"
                            id="showPassword"
                        />
                        <label htmlFor="showPassword" className="text-sm dark:text-gray-300">
                            Show Password
                        </label>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <a
                        href="/reset"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Forgot password?
                    </a>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                        <XCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    className="cursor-pointer w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!email || password.length < 6}
                >
                    Login
                </button>
            </form>

            <p className="cursor:pointer text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <button
                    onClick={() => navigate("/register")}
                    className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                >
                    Sign up
                </button>
            </p>

        </div>
    );
};

export default LoginForm;