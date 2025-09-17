import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ message: "Email already registered." });

        const user = await User.create({ name, email, password });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const getUsers = async (_req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // For now, plain password check (later you’ll add bcrypt + JWT)
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.json({ message: "Login successful", user });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
