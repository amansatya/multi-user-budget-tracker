import React from "react";
import { AlertTriangle, X } from "lucide-react";

const AlertModal = ({ isOpen, onClose, totalSpent, monthlyBudget }) => {
    if (!isOpen || totalSpent <= monthlyBudget) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg max-w-md w-full p-6 relative border border-red-500 dark:border-red-600">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                    <X />
                </button>

                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="text-red-600 dark:text-red-400 w-6 h-6" />
                    <h2 className="text-xl font-semibold">Budget Exceeded</h2>
                </div>

                <p className="text-sm">
                    You've spent <span className="font-bold text-red-600 dark:text-red-400">₹{totalSpent}</span>, which is over your monthly budget of{" "}
                    <span className="font-bold">₹{monthlyBudget}</span>. You might want to review your expenses.
                </p>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
