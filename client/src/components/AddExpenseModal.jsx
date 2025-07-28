import React, { useState } from "react";
import { XCircle } from "lucide-react";

const AddExpenseModal = ({ onClose, onAddExpense }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const isFormValid = category && amount && date && description;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            setError("Please fill in all fields.");
            return;
        }

        const newExpense = {
            id: Date.now(),
            category,
            amount: parseFloat(amount),
            date,
            description,
        };

        onAddExpense(newExpense);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-indigo-900/60 via-purple-800/50 to-pink-700/40 dark:from-slate-900/80 dark:via-gray-800/70 dark:to-zinc-900/60 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    <XCircle className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                    ➕ Add New Expense
                </h2>

                {error && (
                    <div className="text-red-500 text-sm mb-3">❌ {error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="m-0.5 block text-sm font-medium dark:text-gray-300">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="E.g., Groceries"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Amount</label>
                        <input
                            type="number"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="E.g., 500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-white appearance-none relative cursor-pointer dark:[&::-webkit-calendar-picker-indicator]:invert
                             [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="Add a note about this expense..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-2 px-4 rounded-md font-semibold text-white transition-all ${
                            isFormValid
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                        }`}
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;