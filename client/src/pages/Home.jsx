import React from "react";
import { ArrowRight, DollarSign, Users, TrendingUp } from "lucide-react";

const Home = () => {
    const handleGetStarted = () => {
        console.log("Navigate to login page");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">

            <main className="relative overflow-hidden">

                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/10 dark:bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                    <div className="text-center max-w-4xl mx-auto">

                        <div className="mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
                            <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl dark:shadow-blue-500/25">
                                <DollarSign className="h-24 w-24 text-white" />
                            </div>
                        </div>

                        <h1 className="h-22 text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r z-50 from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                            Budget Buddy
                        </h1>

                        <div className="space-y-4 mt-10 mb-8 opacity-0 z-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
                            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium">
                                Take control of your finances with our powerful multi-user budget tracking platform
                            </p>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                                Collaborate with family and friends to manage budgets, track expenses, and achieve your financial goals together
                            </p>
                            <p className="text-base md:text-lg text-gray-500 dark:text-gray-500">
                                Real-time insights, beautiful dashboards, and smart recommendations to make budgeting effortless
                            </p>
                        </div>

                        <div className="mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                            <button
                                onClick={handleGetStarted}
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl dark:shadow-blue-500/25 inline-flex items-center"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl dark:hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <DollarSign className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Smart Budgeting</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center">AI-powered insights to optimize your spending</p>
                            </div>

                            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl dark:hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Multi-User</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center">Collaborate with family and friends seamlessly</p>
                            </div>

                            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl dark:hover:shadow-pink-500/10 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                    <TrendingUp className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Real-time Analytics</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center">Track progress with beautiful visualizations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
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
    );
};

export default Home;