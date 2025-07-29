import React, { useState } from "react";

const ExpenseTable = ({ expenses }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    function parseDate(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day); // month - 1 because Date() expects 0-11
    }

    const sortedExpenses = [...expenses].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
    });

    const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);

    const paginatedExpenses = sortedExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalAmountSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    function getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    const getAverageSpendPerDay = () => {
        if (expenses.length === 0) return 0;

        // Get unique month-year combinations from expenses
        const uniqueMonths = new Set();
        expenses.forEach(expense => {
            const date = parseDate(expense.date); // Use our custom parser

            if (!isNaN(date.getTime())) { // Check if date is valid
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Convert 0-11 to 1-12
                const monthKey = `${year}-${month}`;
                uniqueMonths.add(monthKey);
            }
        });

        let totalDaysInMonths = 0;
        uniqueMonths.forEach(monthKey => {
            const [year, month] = monthKey.split('-').map(Number);
            const daysInMonth = getDaysInMonth(month, year);
            totalDaysInMonths += daysInMonth;
        });

        return totalDaysInMonths > 0 ? totalAmountSpent / totalDaysInMonths : 0;
    };

    const averageSpendPerDay = getAverageSpendPerDay();

    const getPaginationNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-300 via-blue-50/30 to-indigo-100
                       dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950
                       transition-all duration-500">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20
                           dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-blue-200/30 dark:from-blue-800/20
                           rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-radial from-purple-200/30 dark:from-purple-800/20
                           rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto">

                    <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 p-8 mb-8
                                   hover:shadow-3xl transition-all duration-300">

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-6 h-6 rounded-xl shadow-lg bg-gradient-to-br from-emerald-500 to-green-600
                                           shadow-emerald-500/40"></div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
                                          dark:from-gray-100 dark:via-white dark:to-gray-100
                                          bg-clip-text text-transparent">
                                💰 Expense Table
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50
                                           dark:from-emerald-900/20 dark:to-emerald-800/10
                                           rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        Total Expenses
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mt-2">
                                    {expenses.length}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50
                                           dark:from-blue-900/20 dark:to-blue-800/10
                                           rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Total Amount Spent
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                                    ₹{totalAmountSpent.toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50
                                           dark:from-purple-900/20 dark:to-purple-800/10
                                           rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                        Average Daily Spend
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-purple-800 dark:text-purple-200 mt-2">
                                    ₹{Math.round(averageSpendPerDay).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 overflow-hidden
                                   hover:shadow-3xl transition-all duration-300">

                        <div className="p-8 pb-0">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                                All Transactions
                            </h3>
                        </div>

                        <div className="overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50
                                                      dark:from-gray-800/50 dark:to-gray-700/30
                                                      border-b border-gray-200/50 dark:border-gray-600/30">
                                        <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Description
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/30">
                                    {paginatedExpenses.map((expense) => (
                                        <tr key={expense.id}
                                            className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent
                                                          dark:hover:from-blue-900/20 dark:hover:to-transparent
                                                          transition-all duration-200">
                                            <td className="px-8 py-6 text-gray-700 dark:text-gray-300 font-medium">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500
                                                                       rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                                    {expense.date}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold
                                                                    bg-gradient-to-r from-blue-100 to-blue-50
                                                                    dark:from-blue-900/30 dark:to-blue-800/20
                                                                    text-blue-800 dark:text-blue-200
                                                                    border border-blue-200/50 dark:border-blue-700/30">
                                                        {expense.category}
                                                    </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                    <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold
                                                                    bg-gradient-to-r from-emerald-100 to-emerald-50
                                                                    dark:from-emerald-900/30 dark:to-emerald-800/20
                                                                    text-emerald-800 dark:text-emerald-200
                                                                    border border-emerald-200/50 dark:border-emerald-700/30
                                                                    shadow-sm">
                                                        ₹{expense.amount.toLocaleString()}
                                                    </span>
                                            </td>
                                            <td className="px-8 py-6 text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center">
                                                    <span className="truncate max-w-md">{expense.description}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="p-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
                                <div className="flex justify-center items-center gap-3 flex-wrap">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                            currentPage === 1
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                        }`}
                                    >
                                        ← Previous
                                    </button>

                                    <div className="flex gap-2">
                                        {getPaginationNumbers().map((num, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => typeof num === "number" && setCurrentPage(num)}
                                                disabled={num === "..."}
                                                className={`w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
                                                    currentPage === num
                                                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-110"
                                                        : num === "..."
                                                            ? "text-gray-400 dark:text-gray-600 cursor-default"
                                                            : "bg-white/60 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/30 hover:shadow-md transform hover:scale-105"
                                                }`}
                                            >
                                                {num}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                                            currentPage === totalPages
                                                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                                        }`}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTable;