import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const LayoutWrapper = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

        setIsDarkMode(shouldBeDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", newMode);
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isAuthenticated={isAuthenticated}
            />

            <div className={`flex flex-col flex-grow transition-all duration-300 ${
                sidebarOpen && isAuthenticated ? 'md:ml-64' : 'ml-0'
            }`}>

                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                    isAuthenticated={isAuthenticated}
                />

                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default LayoutWrapper;





// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
//
// const LayoutWrapper = ({ children }) => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [isAuthenticated] = useState(false);
//
//     useEffect(() => {
//         const savedTheme = localStorage.getItem("theme");
//         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
//
//         setIsDarkMode(shouldBeDark);
//         document.documentElement.classList.toggle("dark", shouldBeDark);
//     }, []);
//
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) {
//                 setSidebarOpen(true);
//             } else {
//                 setSidebarOpen(false);
//             }
//         };
//
//         handleResize();
//
//         window.addEventListener('resize', handleResize);
//
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//
//     const toggleDarkMode = () => {
//         const newMode = !isDarkMode;
//         setIsDarkMode(newMode);
//         localStorage.setItem("theme", newMode ? "dark" : "light");
//         document.documentElement.classList.toggle("dark", newMode);
//     };
//
//     return (
//         <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
//
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}
//
//             <Sidebar
//                 isOpen={sidebarOpen}
//                 onClose={() => setSidebarOpen(false)}
//                 isAuthenticated={isAuthenticated}
//             />
//
//             <div className={`flex flex-col flex-grow transition-all duration-300 ${
//                 sidebarOpen && isAuthenticated ? 'md:ml-64' : 'ml-0'
//             }`}>
//
//                 <Navbar
//                     sidebarOpen={sidebarOpen}
//                     setSidebarOpen={setSidebarOpen}
//                     isDarkMode={isDarkMode}
//                     toggleDarkMode={toggleDarkMode}
//                     isAuthenticated={isAuthenticated}
//                 />
//
//                 <main className="flex-grow">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default LayoutWrapper;