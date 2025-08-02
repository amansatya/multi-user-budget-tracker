import React, { useState } from "react";

const NotificationPreferences = () => {
    const [emailNotification, setEmailNotification] = useState(true);

    return (
        <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                🔔 Notification Preferences
            </h2>
            <div className="flex items-center space-x-3 text-sm text-gray-700 dark:text-gray-200">
                <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={emailNotification}
                    onChange={(e) => setEmailNotification(e.target.checked)}
                    className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="emailNotifications">Send me email notifications</label>
            </div>
        </div>
    );
};

export default NotificationPreferences;
