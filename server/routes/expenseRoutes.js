import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, description, amount, category, date, isRecurring, frequency } = req.body;

        const newExpense = new Expense({ userId, description, amount, category, date, isRecurring, frequency });
        await newExpense.save();

        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Error creating expense", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedExpense) return res.status(404).json({ message: "Expense not found" });

        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).json({ message: "Expense not found" });

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error });
    }
});

export default router;
