import React from "react";

const BudgetProgressBar = ({ data, monthlyLimit }) => {
    const totalSpent = data.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = Math.min((totalSpent / monthlyLimit) * 100, 100);
    const remainingAmount = Math.max(monthlyLimit - totalSpent, 0);

    return (
        <div className="bg-gradient-to-br from-slate-300 via-blue-50/30 to-indigo-100
                       dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Monthly Budget Progress - Current Month
            </h2>

            <div className="relative mb-6">

                <div className="relative w-full h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-pink-500 dark:border-pink-400 overflow-hidden">

                    <div
                        className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>

                <div
                    className="absolute -top-8 transform -translate-x-1/2 text-sm font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded shadow-sm"
                    style={{
                        left: `${Math.min(Math.max(percentage, 5), 95)}%`,
                    }}
                >
                    {percentage.toFixed(1)}%
                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span>₹0</span>
                    <span>Budget: ₹{monthlyLimit}</span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 rounded-lg p-4 mt-20">
                <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                    Budget Summary
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody className="space-y-2">
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                            <td className="py-2 font-medium text-gray-700 dark:text-gray-300">
                                Monthly Limit Set
                            </td>
                            <td className="py-2 text-right font-semibold text-gray-900 dark:text-white">
                                ₹{monthlyLimit.toLocaleString()}
                            </td>
                        </tr>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                            <td className="py-2 font-medium text-gray-700 dark:text-gray-300">
                                Total Amount Spent
                            </td>
                            <td className="py-2 text-right font-semibold text-red-600 dark:text-red-400">
                                ₹{totalSpent.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 font-medium text-gray-700 dark:text-gray-300">
                                Remaining Budget
                            </td>
                            <td className={`py-2 text-right font-semibold ${
                                remainingAmount > 0
                                    ? 'text-green-600 dark:text-green-400'
                                    : 'text-red-600 dark:text-red-400'
                            }`}>
                                ₹{remainingAmount.toLocaleString()}
                                {remainingAmount <= 0 && ' (Over Budget!)'}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BudgetProgressBar;