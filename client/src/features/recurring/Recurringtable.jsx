import React, { useState } from "react";
import mockExpenses from "../../data/mockExpenses.json";
import UpdateExpenseModal from "../datamanipulation/UpdateExpenseModal";
import DeleteConfirmModal from "../datamanipulation/DeleteConfirmModal";

const RecurringPayments = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRecurring, setSelectedRecurring] = useState(null);

    const recurringData = mockExpenses.filter(expense => expense.isRecurring === true);

    function parseDate(dateString) {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const sortedRecurringData = [...recurringData].sort((a, b) => {
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        return dateA - dateB;
    });

    const totalPages = Math.ceil(sortedRecurringData.length / itemsPerPage);

    const paginatedRecurringData = sortedRecurringData.slice(
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

    const getFrequencyText = (recurrence) => {
        const frequencyMap = {
            "daily": "Every day",
            "weekly": "Every week",
            "bi-weekly": "Every two weeks",
            "monthly": "Every month",
            "bi-monthly": "Every two months",
            "quarterly": "Every three months",
            "half-yearly": "Every six months",
            "yearly": "Every year"
        };
        return frequencyMap[recurrence] || recurrence;
    };

    const toggleDropdown = (recurringId) => {
        setDropdownOpen(dropdownOpen === recurringId ? null : recurringId);
    };

    const handleUpdate = (recurring) => {
        setSelectedRecurring(recurring);
        setUpdateModalOpen(true);
        setDropdownOpen(null);
        console.log('Update recurring payment:', recurring);
    };

    const handleDelete = (recurring) => {
        setSelectedRecurring(recurring);
        setDeleteModalOpen(true);
        setDropdownOpen(null);
        console.log('Delete recurring payment:', recurring);
    };

    const handleUpdateSubmit = (updatedRecurring) => {
        console.log('Updated recurring payment data:', updatedRecurring);
        setUpdateModalOpen(false);
        setSelectedRecurring(null);
        // TODO: Connect to backend API in Phase 2
    };

    const handleDeleteConfirm = () => {
        console.log('Confirmed delete for recurring payment:', selectedRecurring);
        setDeleteModalOpen(false);
        setSelectedRecurring(null);
        // TODO: Connect to backend API in Phase 2
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
                            <div className="w-6 h-6 rounded-xl shadow-lg bg-gradient-to-br from-emerald-500 to-green-600 shadow-emerald-500/40"></div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
                   dark:from-gray-100 dark:via-white dark:to-gray-100
                   bg-clip-text text-transparent leading-tight mb-2">
                                Recurring Payments
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50
                                           dark:from-emerald-900/20 dark:to-emerald-800/10
                                           rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                        Total Recurring Payments
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-emerald-800 dark:text-emerald-200 mt-2">
                                    {recurringData.length}
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50
                                           dark:from-blue-900/20 dark:to-blue-800/10
                                           rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Total Monthly Commitment
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-blue-800 dark:text-blue-200 mt-2">
                                    ₹{recurringData.reduce((total, item) => {
                                    const multiplier = item.recurrence === 'weekly' ? 4.33 :
                                        item.recurrence === 'yearly' ? 1/12 :
                                            item.recurrence === 'daily' ? 30 :
                                                item.recurrence === 'bi-weekly' ? 2.16 :
                                                    item.recurrence === 'bi-monthly' ? 0.5 :
                                                        item.recurrence === 'quarterly' ? 1/3 :
                                                            item.recurrence === 'half-yearly' ? 1/6 : 1;
                                    return total + (item.amount * multiplier);
                                }, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white via-yellow-50 to-orange-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 overflow-hidden
                                   hover:shadow-3xl transition-all duration-300">

                        <div className="p-8 pb-0">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                                All Recurring Payments
                            </h3>
                        </div>

                        {recurringData.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="text-gray-500 dark:text-gray-400 text-lg">
                                    No recurring payments found
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50
                                                              dark:from-gray-800/50 dark:to-gray-700/30
                                                              border-b border-gray-200/50 dark:border-gray-600/30">
                                                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Category
                                                </th>
                                                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Start Date
                                                </th>
                                                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Amount
                                                </th>
                                                <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Frequency
                                                </th>
                                                <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/30">
                                            {paginatedRecurringData.map((item) => (
                                                <tr key={item.id}
                                                    className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent
                                                                  dark:hover:from-blue-900/20 dark:hover:to-transparent
                                                                  transition-all duration-200">
                                                    <td className="px-8 py-6 text-gray-700 dark:text-gray-300 font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500
                                                                               rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                                            {item.description || "—"}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold
                                                                            bg-gradient-to-r from-blue-100 to-blue-50
                                                                            dark:from-blue-900/30 dark:to-blue-800/20
                                                                            text-blue-800 dark:text-blue-200
                                                                            border border-blue-200/50 dark:border-blue-700/30">
                                                                {item.category}
                                                            </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-gray-700 dark:text-gray-300 font-medium">
                                                        {item.date}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                            <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold
                                                                            bg-gradient-to-r from-emerald-100 to-emerald-50
                                                                            dark:from-emerald-900/30 dark:to-emerald-800/20
                                                                            text-emerald-800 dark:text-emerald-200
                                                                            border border-emerald-200/50 dark:border-emerald-700/30
                                                                            shadow-sm">
                                                                ₹{item.amount.toLocaleString()}
                                                            </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-bold
                                                                            bg-gradient-to-r from-green-100 to-green-50
                                                                            dark:from-green-900/30 dark:to-green-800/20
                                                                            text-green-800 dark:text-green-200
                                                                            border border-green-200/50 dark:border-green-700/30">
                                                                {getFrequencyText(item.recurrence)}
                                                            </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-center">
                                                        <div className="relative">
                                                            <button
                                                                onClick={() => toggleDropdown(item.id)}
                                                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                                                                         text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                                                                         transition-all duration-200 transform hover:scale-110"
                                                            >
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                </svg>
                                                            </button>

                                                            {dropdownOpen === item.id && (
                                                                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800
                                                                               rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50
                                                                               z-50 overflow-hidden">
                                                                    <button
                                                                        onClick={() => handleUpdate(item)}
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
                                                                        onClick={() => handleDelete(item)}
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

                                {totalPages > 1 && (
                                    <div className="p-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
                                        <div className="flex justify-center items-center gap-3 flex-wrap">
                                            <button
                                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
                                                        className={`cursor-pointer w-12 h-12 rounded-xl font-bold transition-all duration-200 ${
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
                                                className={`cursor-pointer px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
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
                            </>
                        )}
                    </div>
                </div>
            </div>

            {updateModalOpen && (
                <UpdateExpenseModal
                    isOpen={updateModalOpen}
                    onClose={() => {
                        setUpdateModalOpen(false);
                        setSelectedRecurring(null);
                    }}
                    expense={selectedRecurring}
                    onSubmit={handleUpdateSubmit}
                />
            )}

            {deleteModalOpen && (
                <DeleteConfirmModal
                    isOpen={deleteModalOpen}
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setSelectedRecurring(null);
                    }}
                    item={selectedRecurring}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default RecurringPayments;