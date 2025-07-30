import React, { useState } from "react";
import { CalendarDays, Filter, XCircle } from "lucide-react";
import mockExpenses from "../../data/mockExpenses";

const DashboardFilters = ({ onFilter }) => {
    const [category, setCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const categories = Array.from(new Set(mockExpenses.map(exp => exp.category)));

    const hasActiveFilters = category || fromDate || toDate;

    const convertYYYYMMDDtoDDMMYYYY = (yyyymmdd) => {
        if (!yyyymmdd) return "";
        const [year, month, day] = yyyymmdd.split('-');
        return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    };

    const handleApplyFilters = () => {

        const filterData = {
            category,
            fromDate: fromDate ? convertYYYYMMDDtoDDMMYYYY(fromDate) : "",
            toDate: toDate ? convertYYYYMMDDtoDDMMYYYY(toDate) : ""
        };
        onFilter(filterData);
    };

    const handleClearFilters = () => {
        setCategory("");
        setFromDate("");
        setToDate("");
        onFilter({ category: "", fromDate: "", toDate: "" });
    };

    return (
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/500 p-8 mb-8
                       hover:shadow-3xl transition-all duration-300">

            <div className="flex items-center gap-4 mb-6">
                <div className="w-6 h-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600
                               shadow-blue-500/40"></div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800
                              dark:from-gray-100 dark:via-white dark:to-gray-100
                              bg-clip-text text-transparent flex items-center gap-3">
                    <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Filter Expenses
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/80
                                     border border-gray-200/50 dark:border-gray-700/50
                                     text-gray-800 dark:text-white
                                     focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                                     backdrop-blur-sm transition-all duration-200
                                     cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-700/80"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        From Date
                    </label>
                    <div className="relative">
                        <div className="flex items-center bg-gray-50/80 dark:bg-gray-800/80
                                      border border-gray-200/50 dark:border-gray-700/50
                                      rounded-xl px-3 py-1 backdrop-blur-sm
                                      focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500
                                      transition-all duration-200">
                            <CalendarDays className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="w-full p-2 bg-transparent text-gray-800 dark:text-white
                                         outline-none cursor-pointer
                                         dark:[&::-webkit-calendar-picker-indicator]:invert
                                         [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        To Date
                    </label>
                    <div className="relative">
                        <div className="flex items-center bg-gray-50/80 dark:bg-gray-800/80
                                      border border-gray-200/50 dark:border-gray-700/50
                                      rounded-xl px-3 py-1 backdrop-blur-sm
                                      focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500
                                      transition-all duration-200">
                            <CalendarDays className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="w-full p-2 bg-transparent text-gray-800 dark:text-white
                                         outline-none cursor-pointer
                                         dark:[&::-webkit-calendar-picker-indicator]:invert
                                         [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <button
                    onClick={handleApplyFilters}
                    className="cursor-pointer group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
                             text-white py-3 px-8 rounded-xl w-full sm:w-auto
                             shadow-lg hover:shadow-xl transform hover:scale-105
                             transition-all duration-200 font-medium
                             flex items-center justify-center gap-2"
                >
                    <Filter className="w-4 h-4 group-hover:rotate-6 transition-transform duration-200" />
                    Apply Filters
                </button>

                <button
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters}
                    className={`cursor-pointer flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                        hasActiveFilters
                            ? "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg"
                            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    }`}
                >
                    <XCircle className={`w-4 h-4 ${hasActiveFilters ? 'hover:rotate-90' : ''} transition-transform duration-200`} />
                    Clear All Filters
                </button>
            </div>

            {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Active filters:</span>
                        {category && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                           bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200
                                           border border-blue-200 dark:border-blue-700">
                                Category: {category}
                            </span>
                        )}
                        {fromDate && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                           bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200
                                           border border-green-200 dark:border-green-700">
                                From: {convertYYYYMMDDtoDDMMYYYY(fromDate)}
                            </span>
                        )}
                        {toDate && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                           bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200
                                           border border-purple-200 dark:border-purple-700">
                                To: {convertYYYYMMDDtoDDMMYYYY(toDate)}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardFilters;