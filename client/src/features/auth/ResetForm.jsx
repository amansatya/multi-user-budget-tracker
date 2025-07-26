import React, { useState } from "react";

const ResetForm = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const mockRegisteredEmails = ["test@example.com", "user@budgetbuddy.com"];
        if (!mockRegisteredEmails.includes(email)) {
            setError("Sorry, no account found with this email.");
            return;
        }

        console.log("Resetting password for:", email);
        setSuccess("✅ Password reset successfully (mock)");
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
    };


    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 mt-10 text-gray-800 dark:text-gray-100">
            <h2 className="text-3xl font-extrabold text-center mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Reset Password
            </h2>
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                Enter your email and new password to reset your account.
            </p>

            {error && <div className="text-red-600 mb-3">❌ {error}</div>}
            {success && <div className="text-green-600 mb-3">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm mb-1">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring focus:border-blue-400"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={
                        !email ||
                        !newPassword ||
                        !confirmPassword ||
                        newPassword !== confirmPassword ||
                        newPassword.length < 6
                    }
                    className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md transition-all
               hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    🔒 Reset Password
                </button>

            </form>
        </div>
    );
};

export default ResetForm;
