import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const SetExpenseLimitModal = ({ isOpen, onClose, currentLimit, onSave }) => {
    const [limit, setLimit] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setLimit("");
        setError("");
    }, [isOpen]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!limit || isNaN(Number(limit)) || Number(limit) <= 0) {
            setError("Please enter a valid budget greater than ₹0.");
            return;
        }

        console.log("💰 Monthly Budget Set To:", limit);

        if (onSave) onSave(Number(limit));
        onClose();
    };

    const isFormValid = limit && !isNaN(Number(limit)) && Number(limit) > 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/60 via-purple-800/50 to-pink-700/40 dark:from-slate-900/80 dark:via-gray-800/70 dark:to-zinc-900/60 backdrop-blur-sm z-50">
            <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={onClose} className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-red-500">
                    <X />
                </button>

                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    Set Monthly Budget
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter your desired monthly expense limit.
                </p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Monthly Limit (₹)
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="e.g. 50000"
                        />
                        {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-2 px-4 font-semibold rounded-md transition-all ${
                            isFormValid
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Save Budget
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetExpenseLimitModal;