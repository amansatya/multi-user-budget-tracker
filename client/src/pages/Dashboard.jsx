import React, { useState, useEffect } from "react";
import ExpenseTable from "../features/dashboard/ExpenseTable";
import PieChart from "../features/dashboard/PieChart";
import LineChart from "../features/dashboard/LineChart";
import BudgetProgressBar from "../components/BudgetProgressBar";
import AddExpenseModal from "../components/AddExpenseModal";
import SetLimitModal from "../components/SetLimitModal";
import AlertModal from "../components/AlertModal";
import DashboardFilters from "../features/dashboard/DashboardFilters";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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

    return (
        <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-950 ${isDarkMode ? 'dark' : ''}`}>

            <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                isAuthenticated={isAuthenticated}
            />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isAuthenticated={isAuthenticated}
            />

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={handleOverlayClick}
                />
            )}

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
        </div>
    );
};

export default Dashboard;