import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const RegisterForm = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const mockExistingEmails = ["demo@user.com", "test@budgetbuddy.com"];

    const isFormValid =
        name.trim() &&
        email.trim() &&
        password.length >= 6 &&
        password === confirmPassword;

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (mockExistingEmails.includes(email)) {
            setError("❌ Email is already in use.");
            return;
        }

        console.log("Registering:", { name, email, password });
        setSuccess("✅ Registered successfully (mock)");
        setTimeout(() => navigate("/dashboard"), 1500);
    };

    return (
        <div className="my-4 w-full  min-h-screen flex items-center justify-center bg-gradient-to-br ">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-extrabold text-center mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Join Budget Buddy
                </h2>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Sign up and manage your finances like a pro!
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 dark:text-gray-300">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="Min 6 characters"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 dark:text-gray-300">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <div className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="mr-2"
                            id="showPassword"
                        />
                        <label htmlFor="showPassword" className="dark:text-gray-300">
                            Show Password
                        </label>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                            <XCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 dark:text-green-400 text-sm">{success}</div>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-2 px-4 rounded-md font-semibold text-white transition-all ${
                            isFormValid
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                : "bg-blue-300 cursor-not-allowed"
                        }`}
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>

    );
};

export default RegisterForm;
