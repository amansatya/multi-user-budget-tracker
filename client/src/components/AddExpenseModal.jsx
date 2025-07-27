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
            id: Date.now(), // Temporary ID
            category,
            amount: parseFloat(amount),
            date,
            description,
        };

        onAddExpense(newExpense); // Trigger parent update
        onClose(); // Close modal
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
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
                        <label className="block text-sm font-medium dark:text-gray-300">Category</label>
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
                            className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
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
                        className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-all ${
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
