import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

const UpdateExpenseModal = ({ isOpen, onClose, expense, onUpdateExpense }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrence, setRecurrence] = useState("off");
    const [error, setError] = useState("");

    const isFormValid = category && amount && date && description;

    const formatDateForInput = (inputDate) => {
        if (!inputDate) return "";
        if (inputDate.includes("-")) {
            const parts = inputDate.split("-");
            if (parts[0].length === 2) {
                const [dd, mm, yyyy] = parts;
                return `${yyyy}-${mm}-${dd}`;
            }
            return inputDate;
        }
        return "";
    };

    const formatDateForSave = (inputDate) => {
        if (!inputDate) return "";
        const [yyyy, mm, dd] = inputDate.split("-");
        return `${dd}-${mm}-${yyyy}`;
    };

    useEffect(() => {
        if (expense && isOpen) {
            setCategory(expense.category || "");
            setAmount(expense.amount?.toString() || "");
            setDate(formatDateForInput(expense.date));
            setDescription(expense.description || "");
            setIsRecurring(expense.isRecurring || false);
            setRecurrence(expense.recurrence || "off");
            setError("");
        }
    }, [expense, isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleRecurringChange = (e) => {
        const checked = e.target.checked;
        setIsRecurring(checked);
        setRecurrence(checked ? "monthly" : "off");
    };

    const handleSubmit = () => {
        if (!isFormValid) {
            setError("Please fill in all fields.");
            return;
        }

        const updatedExpense = {
            ...expense,
            category,
            amount: parseFloat(amount),
            date: formatDateForSave(date),
            description,
            isRecurring,
            recurrence: isRecurring ? recurrence : "off",
        };

        onUpdateExpense(updatedExpense);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900/60 via-purple-800/50 to-pink-700/40 dark:from-slate-900/80 dark:via-gray-800/70 dark:to-zinc-900/60 backdrop-blur-sm pt-[69px] pb-[5px]">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          .modal-scrollbar::-webkit-scrollbar { width: 8px; }
          .modal-scrollbar::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #e2e8f0, #cbd5e1); border-radius: 10px;
          }
          .modal-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #3b82f6, #1d4ed8); border-radius: 10px;
            box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
          }
          .modal-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #2563eb, #1e40af);
          }
          .dark .modal-scrollbar::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #374151, #4b5563);
          }
          .dark .modal-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #6366f1, #4f46e5);
          }
          .dark .modal-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #5b21b6, #7c3aed);
          }
        `,
                }}
            />

            <div className="h-full overflow-y-auto flex justify-center p-4">
                <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 p-5 rounded-lg shadow-lg w-full max-w-md relative h-fit max-h-full overflow-y-auto modal-scrollbar">

                    <button
                        className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10 bg-white/50 dark:bg-gray-700/50 rounded-full p-1 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                        onClick={onClose}
                    >
                        <XCircle className="w-5 h-5" />
                    </button>

                    <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white text-center">
                        ✏️ Update Expense
                    </h2>

                    {error && (
                        <div className="text-red-500 text-sm mb-3 bg-red-50 dark:bg-red-900/20 p-2 rounded-md border border-red-200 dark:border-red-800">
                            ❌ {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <div>
                            <label className="m-0.5 block text-sm font-medium dark:text-gray-300">Category</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">Amount</label>
                            <input
                                type="number"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-white appearance-none relative cursor-pointer dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                            />
                        </div>

                        <div>
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={isRecurring}
                                        onChange={handleRecurringChange}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`w-11 h-6 rounded-full border transition-all duration-300 ${
                                            isRecurring
                                                ? "bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 dark:from-blue-900 dark:via-indigo-900 dark:to-blue-800 border-blue-300 dark:border-blue-600"
                                                : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                                        }`}
                                    >
                                        <div
                                            className={`absolute w-4 h-4 rounded-full shadow-sm transform transition-all duration-300 top-1 ${
                                                isRecurring
                                                    ? "translate-x-5 bg-gradient-to-br from-blue-500 to-indigo-600"
                                                    : "translate-x-1 bg-gray-400 dark:bg-gray-500"
                                            }`}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Recurring Payment
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium dark:text-gray-300 mb-2">Recurrence</label>
                            <select
                                value={recurrence}
                                onChange={(e) => setRecurrence(e.target.value)}
                                disabled={!isRecurring}
                                className={`w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 transition-all duration-200 ${
                                    isRecurring
                                        ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className={`cursor-pointer w-full py-2.5 px-4 rounded-md font-semibold text-white transition-all duration-200 transform ${
                                isFormValid
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg"
                                    : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                            }`}
                        >
                            Update Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateExpenseModal;
