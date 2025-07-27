import React, { useState, useEffect } from "react";
import ExpenseTable from "../features/dashboard/ExpenseTable";
import PieChart from "../features/dashboard/PieChart";
import LineChart from "../features/dashboard/LineChart";
import BudgetProgressBar from "../components/BudgetProgressBar";
import AddExpenseModal from "../components/AddExpenseModal";
import SetLimitModal from "../components/SetLimitModal";
import AlertModal from "../components/AlertModal";
import DashboardFilters from "../features/dashboard/DashboardFilters";

import mockExpenses from "../data/mockExpenses.json";

const Dashboard = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [filteredExpenses, setFilteredExpenses] = useState(mockExpenses);
    const [monthlyBudget, setMonthlyBudget] = useState(50000);

    const totalSpent = mockExpenses.reduce((sum, e) => sum + e.amount, 0);

    useEffect(() => {
        if (totalSpent > monthlyBudget) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [totalSpent, monthlyBudget]);

    const handleFilter = ({ category, fromDate, toDate }) => {
        let filtered = mockExpenses;

        if (category) {
            filtered = filtered.filter(e => e.category === category);
        }

        if (fromDate) {
            filtered = filtered.filter(e => new Date(e.date) >= new Date(fromDate));
        }

        if (toDate) {
            filtered = filtered.filter(e => new Date(e.date) <= new Date(toDate));
        }

        setFilteredExpenses(filtered);
    };

    return (
        <div className="p-6 space-y-6">
            {/* 👋 Welcome & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Welcome back, Satya!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Here's your spending summary at a glance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        ➕ Add Expense
                    </button>
                    <button
                        onClick={() => setShowLimitModal(true)}
                        className="cursor-pointer bg-green-600 hover:green-700 text-white px-4 py-2 rounded-md"
                    >
                        🎯 Set Limit
                    </button>
                </div>
            </div>

            {/* 🚨 Alert Modal - FIXED: Added missing props */}
            <AlertModal
                isOpen={showAlert}
                onClose={() => setShowAlert(false)}
                totalSpent={totalSpent}
                monthlyBudget={monthlyBudget}
            />

            {/* 🎛️ Filters */}
            <DashboardFilters onFilter={handleFilter} />

            {/* 💸 Expense Table */}
            <ExpenseTable expenses={filteredExpenses} />

            {/* 📊 Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChart data={filteredExpenses} />
                <BudgetProgressBar data={filteredExpenses} monthlyLimit={monthlyBudget} />
            </div>

            {/* 📈 Line Chart */}
            <LineChart data={filteredExpenses} />

            {/* 💬 Modals */}
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
    );
};

export default Dashboard;