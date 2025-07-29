import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { getCategoryColor } from "../../utils/categoryHelpers";

const CustomLegend = ({ data, navigate }) => (
    <div className="mt-6">
        <div className="flex flex-wrap gap-3 justify-center">
            {data.map((entry, index) => (
                <div
                    key={`legend-${index}`}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => navigate(`/categoryview/${encodeURIComponent(entry.name)}`)}
                >
                    <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: getCategoryColor(entry.name) }}
                    ></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        {entry.name}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

const PieChartComponent = ({ data }) => {
    const navigate = useNavigate();

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
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-slate-800 dark:to-gray-900 border border-white/20 dark:border-gray-700/50 p-6 rounded-lg shadow-md">
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

            <CustomLegend data={formattedData} navigate={navigate} />
        </div>
    );
};

export default PieChartComponent;