import React from "react";
import { ArrowRight, DollarSign, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LayoutWrapper from "../layout/LayoutWrapper";

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <LayoutWrapper>
            <div className="min-h-screen font-[Poppins] bg-gradient-to-br from-[#f2f7fd] via-[#eaeefc] to-[#e1e8f9] dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 text-gray-900 dark:text-gray-100">
                <main className="relative overflow-hidden">

                    <div className="absolute inset-0 overflow-hidden z-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/10 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    </div>

                    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                        <div className="text-center max-w-4xl mx-auto">

                            <div className="mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
                                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-full flex items-center justify-center shadow-2xl dark:shadow-blue-500/25">
                                    <DollarSign className="h-16 w-16 text-white" />
                                </div>
                            </div>

                            <h1 className="h-22 text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                                Budget Buddy
                            </h1>

                            <div className="space-y-4 mt-10 mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                                <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                    Take control of your finances with our powerful multi-user budget tracking platform
                                </p>
                                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                                    Collaborate with family and friends to manage budgets, track expenses, and achieve your financial goals together
                                </p>
                                <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                                    Real-time insights, beautiful dashboards, and smart recommendations to make budgeting effortless
                                </p>
                            </div>

                            <div className="mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                                <button
                                    onClick={handleGetStarted}
                                    className="cursor-pointer group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center"
                                >
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                                {[
                                    {
                                        icon: <DollarSign className="h-8 w-8 text-white" />,
                                        title: "Smart Expense Management",
                                        desc: "Easily add/remove expenses and set recurring ones, with clear daily breakdowns.",
                                        border: "border-blue-400 dark:border-blue-600"
                                    },
                                    {
                                        icon: <Users className="h-8 w-8 text-white" />,
                                        title: "Download Reports",
                                        desc: "Export your expenses as Excel or PDF for analysis or sharing.",
                                        border: "border-purple-400 dark:border-purple-600"
                                    },
                                    {
                                        icon: <TrendingUp className="h-8 w-8 text-white" />,
                                        title: "Visual Insights & Alerts",
                                        desc: "View charts and get alerts when your spending exceeds the budget.",
                                        border: "border-pink-400 dark:border-pink-600"
                                    }
                                ].map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border-2 ${feature.border} transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-md hover:shadow-xl`}
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{feature.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-center">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <style>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
        </LayoutWrapper>
    );
};

export default Home;