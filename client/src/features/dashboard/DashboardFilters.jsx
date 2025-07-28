import React, { useState} from "react";
import { CalendarDays, Filter, XCircle } from "lucide-react";
import mockExpenses from "../../data/mockExpenses";

const DashboardFilters = ({ onFilter }) => {
    const [category, setCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const categories = Array.from(new Set(mockExpenses.map(exp => exp.category)));

    const hasActiveFilters = category || fromDate || toDate;

    const handleApplyFilters = () => {
        onFilter({ category, fromDate, toDate });
    };

    const handleClearFilters = () => {
        setCategory("");
        setFromDate("");
        setToDate("");
        onFilter({ category: "", fromDate: "", toDate: "" });
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" /> Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="cursor-pointer w-full p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        From
                    </label>
                    <div className="flex items-center border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2">
                        <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-white appearance-none relative cursor-pointer dark:[&::-webkit-calendar-picker-indicator]:invert
                             [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                        To
                    </label>
                    <div className="flex items-center border rounded-md bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 px-2">
                        <CalendarDays className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-white appearance-none relative cursor-pointer dark:[&::-webkit-calendar-picker-indicator]:invert
                             [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <button
                    onClick={handleApplyFilters}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full sm:w-auto"
                >
                    Apply Filters
                </button>

                <button
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters}
                    className={`cursor-pointer flex items-center text-sm ${
                        hasActiveFilters
                            ? "text-red-600 dark:text-red-400 hover:underline"
                            : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    }`}
                >
                    <XCircle className="w-4 h-4 mr-1" />
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default DashboardFilters;