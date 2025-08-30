import React from "react";

const DeleteConfirmModal = ({ isOpen, onClose, item, onConfirm }) => {
    if (!isOpen) return null;

    const formatDateForDisplay = (inputDate) => {
        if (!inputDate) return "—";
        if (inputDate.includes("-")) {
            const parts = inputDate.split("-");
            if (parts[0].length === 4) {
                const [yyyy, mm, dd] = parts;
                return `${dd}-${mm}-${yyyy}`;
            }
        }
        return inputDate;
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50
                           max-w-md w-full mx-4 transform transition-all duration-300 scale-100">

                <div className="p-6 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                Delete Item
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                This action cannot be undone
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Are you sure you want to delete this item?
                        </p>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Description:</span>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {item?.description || "—"}
                                </span>
                            </div>

                            {item?.category && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {item.category}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    ₹{item?.amount?.toLocaleString() || "—"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Date:</span>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {formatDateForDisplay(item?.date)}
                                </span>
                            </div>

                            {item?.recurrence && item?.recurrence !== "off" && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Frequency:</span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {item.recurrence}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200
                                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                                     text-gray-700 dark:text-gray-200 hover:shadow-md transform hover:scale-105
                                     border border-gray-200/50 dark:border-gray-600/50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200
                                     bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                                     text-white shadow-lg hover:shadow-xl transform hover:scale-105
                                     focus:outline-none focus:ring-4 focus:ring-red-500/20"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
