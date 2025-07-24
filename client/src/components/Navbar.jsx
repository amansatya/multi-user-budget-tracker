import React, { useState } from "react";
import { Sun, Moon, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen, isDarkMode, toggleDarkMode, isAuthenticated }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const userInitials = "SA"; // This should come from user context
    const navigate = useNavigate();

    const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleLogout = () => {
        console.log("Logout clicked");
        setDropdownOpen(false);
    };

    const handleNavigate = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    return (
        <header className="w-full px-4 py-3 shadow-sm bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center relative z-50">
            <div className="flex items-center gap-4">
                {isAuthenticated && (
                    <button
                        onClick={handleToggleSidebar}
                        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                )}

                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
                >
                    Budget Buddy
                </h1>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={toggleDarkMode}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105"
                    aria-label="Toggle Dark Mode"
                >
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-blue-500" />
                    )}
                </button>

                {!isAuthenticated ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => navigate("/login")}
                            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="cursor-pointer px-4 py-2 text-sm font-medium rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                        >
                            Signup
                        </button>
                    </div>
                ) : (
                    <div className="relative">

                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="cursor-pointer w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {userInitials}
                        </button>

                        {dropdownOpen && (
                            <>

                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setDropdownOpen(false)}
                                />

                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 py-1">
                                    <button
                                        onClick={() => handleNavigate("/dashboard")}
                                        className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                                    >
                                        <LayoutDashboard className="w-4 h-4 mr-3" />
                                        Dashboard
                                    </button>

                                    <hr className="border-gray-200 dark:border-gray-700 my-1" />

                                    <button
                                        onClick={handleLogout}
                                        className="cursor-pointer flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                                    >
                                        <LogOut className="w-4 h-4 mr-3" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;