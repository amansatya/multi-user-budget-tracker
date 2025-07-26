import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DayView from "../pages/DayView";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Reset from "../pages/Reset";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/day/:date" element={<DayView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
