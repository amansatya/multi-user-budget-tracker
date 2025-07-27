// src/components/LineChart.jsx

import React from "react";
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
import mockExpenses from "../../data/mockExpenses.json";
import { format, parseISO } from "date-fns";

// Helper: Aggregate daily spending for current month
const getMonthlySpending = () => {
    const currentMonth = new Date().getMonth();
    const spendingMap = {};

    mockExpenses.forEach((expense) => {
        const date = new Date(expense.date);
        if (date.getMonth() === currentMonth) {
            const dayKey = format(date, "yyyy-MM-dd");
            spendingMap[dayKey] = (spendingMap[dayKey] || 0) + expense.amount;
        }
    });

    const formatted = Object.entries(spendingMap).map(([date, total]) => ({
        date,
        amount: total,
    }));

    // Sort by date
    return formatted.sort((a, b) => new Date(a.date) - new Date(b.date));
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 text-white px-3 py-1 rounded shadow text-sm">
                <p>{format(parseISO(label), "MMM dd")}:</p>
                <p className="font-semibold">₹{payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const SpendingLineChart = () => {
    const data = getMonthlySpending();

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                Daily Spending – This Month
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => format(parseISO(date), "dd MMM")}
                        stroke="#94a3b8"
                        className="text-sm"
                    />
                    <YAxis
                        stroke="#94a3b8"
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
                    />
                </ReLineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingLineChart;
