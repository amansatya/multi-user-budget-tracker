import React, { useState } from "react";

const ExpenseTable = ({ expenses }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    // Sort expenses by date (oldest first)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);

    const paginatedExpenses = sortedExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
        <div className="w-full overflow-x-auto bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                💰 Expense Table
            </h2>
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 text-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Amount (₹)</th>
                    <th className="px-4 py-3 text-left">Description</th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100">
                {paginatedExpenses.map((expense) => (
                    <tr
                        key={expense.id}
                        className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <td className="px-4 py-2">{expense.date}</td>
                        <td className="px-4 py-2">{expense.category}</td>
                        <td className="px-4 py-2 font-semibold text-green-600 dark:text-green-400">
                            ₹{expense.amount}
                        </td>
                        <td className="px-4 py-2">{expense.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap text-sm">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className={`cursor-pointer px-3 py-1 rounded-md shadow-sm ${
                            currentPage === 1
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        Prev
                    </button>

                    {getPaginationNumbers().map((num, idx) => (
                        <button
                            key={idx}
                            onClick={() => typeof num === "number" && setCurrentPage(num)}
                            disabled={num === "..."}
                            className={`cursor-pointer px-3 py-1 rounded-md ${
                                currentPage === num
                                    ? "bg-purple-600 text-white"
                                    : num === "..."
                                        ? "text-gray-400 cursor-default"
                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-white"
                            }`}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className={`cursor-pointer px-3 py-1 rounded-md shadow-sm ${
                            currentPage === totalPages
                                ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExpenseTable;