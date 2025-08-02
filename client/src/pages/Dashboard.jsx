import React, { useState, useEffect } from "react";
import ExpenseTable from "../features/dashboard/ExpenseTable";
import PieChart from "../features/dashboard/PieChart";
import LineChart from "../features/dashboard/LineChart";
import BudgetProgressBar from "../features/dashboard/BudgetProgressBar.jsx";
import AddExpenseModal from "../features/dashboard/AddExpenseModal.jsx";
import SetLimitModal from "../features/dashboard/SetLimitModal.jsx";
import AlertModal from "../features/dashboard/AlertModal.jsx";
import DashboardFilters from "../features/dashboard/DashboardFilters";
import LayoutWrapper from "../layout/LayoutWrapper";

import mockExpenses from "../data/mockExpenses.json";

const Dashboard = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState(mockExpenses);
    const [monthlyBudget, setMonthlyBudget] = useState(50000);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const convertToYYYYMMDD = (ddmmyyyy) => {
        const [day, month, year] = ddmmyyyy.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    };

    const getCurrentMonthExpenses = (expenses) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        return expenses.filter(expense => {
            const [day, month, year] = expense.date.split('-').map(Number);
            return month === currentMonth && year === currentYear;
        });
    };

    const currentMonthExpenses = getCurrentMonthExpenses(mockExpenses);
    const filteredCurrentMonthExpenses = getCurrentMonthExpenses(filteredExpenses);
    const totalSpent = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

    useEffect(() => {
        if (totalSpent > monthlyBudget) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [totalSpent, monthlyBudget]);

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

    const handleFilter = ({ category, fromDate, toDate }) => {
        let filtered = mockExpenses;

        if (category) {
            filtered = filtered.filter(e => e.category === category);
        }

        if (fromDate) {
            const fromDateObj = parseDate(fromDate);
            filtered = filtered.filter(e => {
                const expenseDate = parseDate(e.date);
                return expenseDate >= fromDateObj;
            });
        }

        if (toDate) {
            const toDateObj = parseDate(toDate);
            filtered = filtered.filter(e => {
                const expenseDate = parseDate(e.date);
                return expenseDate <= toDateObj;
            });
        }

        setFilteredExpenses(filtered);
    };

    const handlePDFExport = () => {
        // Add PDF export logic here
        console.log("Exporting to PDF...");
    };

    const handleExcelExport = () => {
        // Add Excel export logic here
        console.log("Exporting to Excel...");
    };

    return (
        <LayoutWrapper>
            <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} pt-20 min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
                <div className="p-6 space-y-6 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 shadow-md p-4 rounded-lg">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                                Welcome back, Satya!
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Here's your spending summary at a glance.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                            >
                                ➕ Add Expense
                            </button>
                            <button
                                onClick={() => setShowLimitModal(true)}
                                className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                            >
                                🎯 Set Limit
                            </button>
                        </div>
                    </div>
                    <AlertModal
                        isOpen={showAlert}
                        onClose={() => setShowAlert(false)}
                        totalSpent={totalSpent}
                        monthlyBudget={monthlyBudget}
                    />
                    <DashboardFilters onFilter={handleFilter} />
                    <ExpenseTable expenses={filteredCurrentMonthExpenses} />
                    {/* Export Section */}
                    <div className="bg-white dark:bg-gray-900 shadow-md p-4 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                Export Data
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={handlePDFExport}
                                    className="cursor-pointer flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                    PDF
                                </button>
                                <button
                                    onClick={handleExcelExport}
                                    className="cursor-pointer flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                    </svg>
                                    Excel
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <PieChart data={currentMonthExpenses} />
                        <BudgetProgressBar data={currentMonthExpenses} monthlyLimit={monthlyBudget} />
                    </div>
                    <LineChart data={mockExpenses} />
                    {showAddModal && (
                        <AddExpenseModal
                            isOpen={showAddModal}
                            onClose={() => setShowAddModal(false)}
                        />
                    )}
                    {showLimitModal && (
                        <SetLimitModal
                            isOpen={showLimitModal}
                            onClose={() => setShowLimitModal(false)}
                            currentLimit={monthlyBudget}
                            onSave={(newLimit) => setMonthlyBudget(newLimit)}
                        />
                    )}
                </div>
            </div>
        </LayoutWrapper>
    );
};

export default Dashboard;