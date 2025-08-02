import React from "react";
import { useParams } from "react-router-dom";
import LayoutWrapper from "../layout/LayoutWrapper";

const DayView = () => {
    const { date } = useParams();
    return (
        <LayoutWrapper>
            <div className="text-white p-6">
                <h1 className="text-2xl font-semibold">Day View</h1>
                <p> Viewing expenses for <strong>{date}</strong></p>
            </div>
        </LayoutWrapper>
    );
};

export default DayView;
