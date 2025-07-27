import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { getCategoryColor } from "../../utils/categoryHelpers";

const CustomLegend = ({ payload }) => (
    <ul className="flex flex-wrap gap-4 mt-4 justify-center text-sm">
        {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center gap-2">
                <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: entry.color }}
                ></span>
                <span className="text-gray-700 dark:text-gray-300">{entry.value}</span>
            </li>
        ))}
    </ul>
);

const PieChartComponent = ({ data }) => {
    const navigate = useNavigate();

    // Format and aggregate data by category
    const formattedData = data.reduce((acc, item) => {
        const existing = acc.find((d) => d.name === item.category);
        if (existing) {
            existing.value += item.amount;
        } else {
            acc.push({ name: item.category, value: item.amount });
        }
        return acc;
    }, []);

    const handleSliceClick = (data) => {
        const category = data.name;
        navigate(`/categoryview/${encodeURIComponent(category)}`);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                Spending by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={formattedData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={50}
                        onClick={handleSliceClick}
                        className="cursor-pointer"
                    >
                        {formattedData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getCategoryColor(entry.name)}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#4686e1",
                            color: "#000000",
                            border: "none",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            <Legend content={<CustomLegend />} />
        </div>
    );
};

export default PieChartComponent;
