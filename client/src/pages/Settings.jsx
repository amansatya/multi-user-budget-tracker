import React from "react";
import ProfileSection from "../features/settings/ProfileSection";
import NotificationPreferences from "../features/settings/NotificationPreferences";
import LayoutWrapper from "../layout/LayoutWrapper";

const Settings = () => {
    return (
        <LayoutWrapper>
            <div className="min-h-screen font-[Poppins] bg-gradient-to-br from-[#f2f7fd] via-[#eaeefc] to-[#e1e8f9] dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 text-gray-900 dark:text-gray-100 p-6 space-y-6">
                <ProfileSection />
                <NotificationPreferences />
            </div>
        </LayoutWrapper>
    );
};

export default Settings;
