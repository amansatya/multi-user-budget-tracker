import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const SetExpenseLimitModal = ({ isOpen, onClose, initialLimit = 5000, onSave }) => {
    const [limit, setLimit] = useState(initialLimit);
    const [error, setError] = useState("");

    useEffect(() => {
        setLimit(initialLimit);
        setError("");
    }, [initialLimit, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNaN(limit) || limit <= 0) {
            setError("Please enter a valid budget greater than ₹0.");
            return;
        }

        // Phase 3: Here we’ll POST/PUT to backend
        console.log("💰 Monthly Budget Set To:", limit);

        if (onSave) onSave(limit);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
                    <X />
                </button>

                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    Set Monthly Budget
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter your desired monthly expense limit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Monthly Limit (₹)
                        </label>
                        <input
                            type="number"
                            min={1}
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                            placeholder="e.g. 5000"
                        />
                        {error && <p className="text-red-600 text-sm mt-1">❌ {error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all"
                    >
                        Save Budget
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetExpenseLimitModal;
