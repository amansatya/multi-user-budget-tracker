import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, BarChart2, Settings, Repeat, Home, X } from "lucide-react";
import { format } from "date-fns";

const Sidebar = ({ isOpen, onClose, isAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (!isAuthenticated) return null;

    const today = format(new Date(), "yyyy-MM-dd");

    const navItems = [
        {
            label: "Dashboard",
            icon: <Home className="w-5 h-5" />,
            path: "/dashboard",
        },
        {
            label: "Day View",
            icon: <Calendar className="w-5 h-5" />,
            path: `/day/${today}`,
        },
        {
            label: "Analytics & Charts",
            icon: <BarChart2 className="w-5 h-5" />,
            path: "/dashboard",
            hash: "#charts",
        },
        {
            label: "Settings",
            icon: <Settings className="w-5 h-5" />,
            path: "/settings",
        },
        {
            label: "Recurring Expenses",
            icon: <Repeat className="w-5 h-5" />,
            path: "/settings",
            hash: "#recurring",
        },
    ];

    const handleNavigation = (item) => {
        if (item.hash) {

            navigate(item.path);
            setTimeout(() => {
                const element = document.querySelector(item.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            navigate(item.path);
        }

        if (window.innerWidth < 768) {
            onClose();
        }
    };

    const isActiveRoute = (path) => {
        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-full w-64 z-40 transition-transform duration-300 transform 
                bg-white dark:bg-gray-800 
                shadow-lg border-r border-gray-200 dark:border-gray-700 
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="h-8 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Menu
                </h2>

                <button
                    onClick={onClose}
                    className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer"
                    aria-label="Close Sidebar"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="mt-6 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = isActiveRoute(item.path);

                    return (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item)}
                            className={`flex items-center w-full px-4 py-3 rounded-lg text-left transition-all duration-200 group cursor-pointer ${
                                isActive
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
                            }`}
                        >
                            <span className={`mr-3 transition-colors ${
                                isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                            }`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    <p>Budget Buddy v1.0</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;