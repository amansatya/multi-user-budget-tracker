import React, { useState } from "react";
import { useParams } from "react-router-dom";
import mockExpenses from "../data/mockExpenses";
import { getCategoryColor } from "../utils/categoryHelpers";
import LayoutWrapper from "../layout/LayoutWrapper";
import UpdateExpenseModal from "../features/datamanipulation/UpdateExpenseModal";
import DeleteConfirmModal from "../features/datamanipulation/DeleteConfirmModal";

const CategoryView = () => {
    const { category } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const filteredExpenses = mockExpenses.filter(
        (expense) => expense.category.toLowerCase() === category.toLowerCase()
    );

    const totalSpent = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);

        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleOverlayClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const toggleDropdown = (expenseId) => {
        setDropdownOpen(dropdownOpen === expenseId ? null : expenseId);
    };

    const handleUpdate = (expense) => {
        setSelectedExpense(expense);
        setUpdateModalOpen(true);
        setDropdownOpen(null);
        console.log('Update expense:', expense);
    };

    const handleDelete = (expense) => {
        setSelectedExpense(expense);
        setDeleteModalOpen(true);
        setDropdownOpen(null);
        console.log('Delete expense:', expense);
    };

    const handleUpdateSubmit = (updatedExpense) => {
        console.log('Updated expense data:', updatedExpense);
        setUpdateModalOpen(false);
        setSelectedExpense(null);
        // TODO: Connect to backend API in Phase 2
    };

    const handleDeleteConfirm = () => {
        console.log('Confirmed delete for expense:', selectedExpense);
        setDeleteModalOpen(false);
        setSelectedExpense(null);
        // TODO: Connect to backend API in Phase 2
    };

    return (
        <LayoutWrapper>
            <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50
                       dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950
                       transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20
                           dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-blue-200/30 dark:from-blue-800/20
                           rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-radial from-purple-200/30 dark:from-purple-800/20
                           rounded-full blur-3xl pointer-events-none"></div>

                <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} pt-20 relative z-10`}>
                    <div className="p-8">
                        <div className="max-w-6xl mx-auto">

                            <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900
                                       border border-white/20 dark:border-gray-700/50 p-8 mb-8 rounded-2xl shadow-xl
                                       hover:shadow-3xl transition-all duration-300">

                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="w-6 h-6 rounded-xl shadow-lg"
                                        style={{
                                            backgroundColor: getCategoryColor(category),
                                            boxShadow: `0 4px 20px ${getCategoryColor(category)}40`
                                        }}
                                    ></div>
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
                                              dark:from-gray-100 dark:via-white dark:to-gray-100
                                              bg-clip-text text-transparent">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50
                                               dark:from-emerald-900/20 dark:to-emerald-800/10
                                               rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                            Total Spending
                                        </span>
                                        </div>
                                        <p className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mt-2">
                                            ₹{totalSpent.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50
                                               dark:from-blue-900/20 dark:to-blue-800/10
                                               rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                            Total Transactions
                                        </span>
                                        </div>
                                        <p className="text-3xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                                            {filteredExpenses.length}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50
                                               dark:from-purple-900/20 dark:to-purple-800/10
                                               rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                            Average Amount
                                        </span>
                                        </div>
                                        <p className="text-3xl font-bold text-purple-800 dark:text-purple-200 mt-2">
                                            ₹{filteredExpenses.length > 0 ? Math.round(totalSpent / filteredExpenses.length).toLocaleString() : 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900
                                       border border-white/20 dark:border-gray-700/50 overflow-hidden rounded-2xl shadow-xl
                                       hover:shadow-3xl transition-all duration-300">

                                <div className="p-8 pb-0">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                        <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                                        Transaction History
                                    </h2>
                                </div>

                                {filteredExpenses.length === 0 ? (
                                    <div className="p-16 text-center">
                                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200
                                                   dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-transparent
                                                       rounded-full animate-spin"></div>
                                        </div>
                                        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
                                            No expenses found in this category
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-500 mt-2">
                                            Start adding some transactions to see them here
                                        </p>
                                    </div>
                                ) : (
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
                                                        Amount
                                                    </th>
                                                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                        Description
                                                    </th>
                                                    <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/30">
                                                {filteredExpenses.map((expense) => (
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
                                                        <td className="px-8 py-6 text-center">
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() => toggleDropdown(expense.id)}
                                                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                                                                             text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                                                                             transition-all duration-200 transform hover:scale-110"
                                                                >
                                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                    </svg>
                                                                </button>

                                                                {dropdownOpen === expense.id && (
                                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800
                                                                                   rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50
                                                                                   z-50 overflow-hidden">
                                                                        <button
                                                                            onClick={() => handleUpdate(expense)}
                                                                            className="w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20
                                                                                     text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400
                                                                                     transition-colors duration-200 flex items-center gap-3"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                            </svg>
                                                                            Update
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(expense)}
                                                                            className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20
                                                                                     text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400
                                                                                     transition-colors duration-200 flex items-center gap-3"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {updateModalOpen && (
                    <UpdateExpenseModal
                        isOpen={updateModalOpen}
                        onClose={() => {
                            setUpdateModalOpen(false);
                            setSelectedExpense(null);
                        }}
                        expense={selectedExpense}
                        onSubmit={handleUpdateSubmit}
                    />
                )}

                {deleteModalOpen && (
                    <DeleteConfirmModal
                        isOpen={deleteModalOpen}
                        onClose={() => {
                            setDeleteModalOpen(false);
                            setSelectedExpense(null);
                        }}
                        item={selectedExpense}
                        onConfirm={handleDeleteConfirm}
                    />
                )}
            </div>
        </LayoutWrapper>
    );
};

export default CategoryView;