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

const getMonthlySpending = () => {
    const currentMonth = new Date().getMonth();
    const spendingMap = {};

    mockExpenses.forEach((expense) => {
        const [day, month, year] = expense.date.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        if (date.getMonth() === currentMonth) {
            const dayKey = expense.date;
            spendingMap[dayKey] = (spendingMap[dayKey] || 0) + expense.amount;
        }
    });

    const formatted = Object.entries(spendingMap).map(([date, total]) => ({
        date,
        amount: total,
    }));

    return formatted.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split('-');
        const [dayB, monthB, yearB] = b.date.split('-');
        return new Date(parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA)).getTime() -
            new Date(parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB)).getTime();
    });
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
                        tickFormatter={(date) => {
                            const [day, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return `${day} ${monthNames[parseInt(month) - 1]}`;
                        }}
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