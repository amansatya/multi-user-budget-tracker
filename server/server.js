import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Expense from "./models/Expense.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

app.post("/api/test-user", async (req, res) => {
    try {
        const user = await User.create({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/test-user", async (req, res) => {
    try {
        const user = await User.findOne({ email: "testuser@example.com" });
        if (!user) {
            return res.status(404).json({ error: "Test user not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/test-expense", async (req, res) => {
    try {
        let user = await User.findOne({ email: "testuser@example.com" });
        if (!user) {
            user = await User.create({
                name: "Test Expense User",
                email: "testuser@example.com",
                password: "password123",
            });
        }

        if (!user || !user._id) {
            return res.status(400).json({ error: "No valid user found to attach expense." });
        }

        const expense = await Expense.create({
            userId: user._id,
            date: new Date(),
            amount: 1200,
            category: "Food",
            description: "Groceries for the week",
            isRecurring: true,
            frequency: "weekly",
        });

        res.status(201).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/test-expense", async (req, res) => {
    try {
        const user = await User.findOne({ email: "testuser@example.com" });
        if (!user) {
            return res.status(404).json({ error: "Test user not found" });
        }

        const expenses = await Expense.find({ userId: user._id });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err.message);
        process.exit(1);
    }
};

startServer();

export default app;
