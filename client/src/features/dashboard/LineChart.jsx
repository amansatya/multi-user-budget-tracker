import React, { useState, useEffect } from "react";
import {
    LineChart as ReLineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts";

const getMonthlySpending = (expensesData) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const spendingMap = {};
    expensesData.forEach((expense) => {
        const [day, month, year] = expense.date.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            const dayKey = expense.date;
            spendingMap[dayKey] = (spendingMap[dayKey] || 0) + expense.amount;
        }
    });

    const allDates = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, '0');
        const monthStr = (currentMonth + 1).toString().padStart(2, '0');
        const dateKey = `${dayStr}-${monthStr}-${currentYear}`;

        allDates.push({
            date: dateKey,
            amount: spendingMap[dateKey] || 0,
        });
    }

    return allDates;
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const [day, month, year] = label.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        });

        return (
            <div className="bg-gray-800 text-white px-3 py-1 rounded shadow text-sm">
                <p>{formattedDate}:</p>
                <p className="font-semibold">
                    {payload[0].value === 0 ? 'No spending' : `₹${payload[0].value}`}
                </p>
            </div>
        );
    }
    return null;
};

const SpendingLineChart = ({ data = [] }) => {
    const chartData = getMonthlySpending(data);

    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const gridStroke = isDarkMode ? '#e2e8f0' : '#000000';
    const axisStroke = isDarkMode ? '#e2e8f0' : '#111827';

    return (
        <div className="bg-gradient-to-br from-slate-300 via-blue-50/30 to-indigo-100
                       dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                Daily Spending – This Month
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => {
                            const [day, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return `${day} ${monthNames[parseInt(month) - 1]}`;
                        }}
                        stroke={axisStroke}
                        className="text-sm"
                        interval={0}
                        tick={{ fontSize: 10 }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis
                        stroke={axisStroke}
                        tickFormatter={(value) => `₹${value}`}
                        className="text-sm"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3B82F6"
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, stroke: "#2563EB", strokeWidth: 2, fill: "white" }}
                        connectNulls={false}
                    />
                </ReLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingLineChart;