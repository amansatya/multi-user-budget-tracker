import React, { useState } from "react";
import Recurringtable from "../features/recurring/Recurringtable";
import LayoutWrapper from "../layout/LayoutWrapper";

const Recurringpaymants = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);

        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleOverlayClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <LayoutWrapper>
            <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'} pt-20 min-h-screen bg-gradient-to-br from-slate-300 via-blue-50/30 to-indigo-100
                           dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950`}>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-purple-100/20
                              dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-blue-200/30 dark:from-blue-800/20
                              rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-radial from-purple-200/30 dark:from-purple-800/20
                              rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Recurringtable />
                    </div>
                </div>
            </div>
        </LayoutWrapper>

    );
};

export default Recurringpaymants;