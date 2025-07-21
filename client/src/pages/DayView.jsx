import React from "react";
import { useParams } from "react-router-dom";

const DayView = () => {
    const { date } = useParams();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold">Day View</h1>
            <p>Viewing expenses for <strong>{date}</strong></p>
        </div>
    );
};

export default DayView;
