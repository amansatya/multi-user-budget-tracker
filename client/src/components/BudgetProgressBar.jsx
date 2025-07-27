import React from "react";

const BudgetProgressBar = ({ data, monthlyLimit }) => {
    const totalSpent = data.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = Math.min((totalSpent / monthlyLimit) * 100, 100);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Monthly Budget Progress
            </h2>

            {/* Progress Bar */}
            <div className="relative w-full h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-pink-500 dark:border-pink-400 overflow-hidden">
                {/* Progress Fill */}
                <div
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>

                {/* Dynamic Label */}
                <div
                    className="absolute top-1/2 text-xs font-semibold text-black dark:text-white transform -translate-y-1/2"
                    style={{
                        left: `${Math.min(percentage, 95)}%`,
                    }}
                >
                    ₹{totalSpent}
                </div>
            </div>

            {/* Limits */}
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span>₹0</span>
                <span>Budget: ₹{monthlyLimit}</span>
            </div>
        </div>
    );
};

export default BudgetProgressBar;
