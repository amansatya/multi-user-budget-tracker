import React from "react";
import { useParams } from "react-router-dom";
import mockExpenses from "../data/mockExpenses"; // Adjust path if needed
import { getCategoryColor } from "../utils/categoryHelpers";

const CategoryView = () => {
    const { category } = useParams();

    const filteredExpenses = mockExpenses.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase()
    );

    const totalSpent = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{ color: getCategoryColor(category) }}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Total Spending:{" "}
                    <span className="font-semibold text-green-600 dark:text-green-400">
                        ₹{totalSpent.toLocaleString()}
                    </span>
                </p>

                {filteredExpenses.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No expenses found in this category.
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Amount (₹)</th>
                                <th className="px-4 py-2 text-left">Description</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                            {filteredExpenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    className="border-b border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2">{expense.date}</td>
                                    <td className="px-4 py-2 text-green-600 dark:text-green-400 font-medium">
                                        ₹{expense.amount}
                                    </td>
                                    <td className="px-4 py-2">{expense.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryView;
