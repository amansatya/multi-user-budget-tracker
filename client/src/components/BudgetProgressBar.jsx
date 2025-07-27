import React from "react";
import mockExpenses from "../data/mockExpenses";

const BudgetProgressBar = () => {
    const monthlyBudget = 50000;

    const totalSpent = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = Math.min((totalSpent / monthlyBudget) * 100, 100);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Monthly Budget Progress
            </h2>

            {/* Progress Bar Wrapper */}
            <div className="relative w-full h-6 rounded-full bg-white border-2 border-pink-500 dark:border-pink-400 overflow-hidden">
                {/* Red progress fill only for spent part */}
                <div
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                ></div>

                 {/*Label floats at the end of red fill*/}
                <div
                    className="absolute top-1/2 text-xs font-semibold text-black dark:text-black transform -translate-y-1/2"
                    style={{
                        left: `${Math.min(percentage, 95)}%`, // Prevents overflow on full bar
                    }}
                >
                    ₹{totalSpent}
                </div>
            </div>

            {/* Start/End Labels */}
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span>₹0</span>
                <span>Budget: ₹{monthlyBudget}</span>
            </div>
        </div>
    );
};

export default BudgetProgressBar;
