import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

const AddExpenseModal = ({ isOpen, onClose, onAddExpense }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrence, setRecurrence] = useState("off");
    const [error, setError] = useState("");

    const isFormValid = category && amount && date && description;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleRecurringChange = (e) => {
        const checked = e.target.checked;
        setIsRecurring(checked);
        if (!checked) {
            setRecurrence("off");
        } else {
            setRecurrence("monthly");
        }
    };

    const handleSubmit = () => {
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
            isRecurring,
            recurrence: isRecurring ? recurrence : "off",
        };

        onAddExpense(newExpense);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-indigo-900/60 via-purple-800/50 to-pink-700/40 dark:from-slate-900/80 dark:via-gray-800/70 dark:to-zinc-900/60 backdrop-blur-sm pt-16">
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

                <div className="space-y-4">
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

                    <div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isRecurring}
                                onChange={handleRecurringChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-sm font-medium dark:text-gray-300">Recurring Payment</span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Recurrence</label>
                        <select
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value)}
                            disabled={!isRecurring}
                            className={`w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 ${
                                isRecurring
                                    ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            <option value="off">Off</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="bi-monthly">Bi-monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="half-yearly">Half-yearly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-2 px-4 rounded-md font-semibold text-white transition-all ${
                            isFormValid
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                        }`}
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseModal;