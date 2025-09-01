import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
    try {
        const { userId, description, amount, category, date, isRecurring, frequency } = req.body;

        if (!userId || !description || amount == null || !category) {
            return res.status(400).json({ message: "userId, title, amount, and category are required." });
        }

        const expense = await Expense.create({
            userId,
            description,
            amount,
            category,
            date,
            isRecurring,
            frequency,
        });

        return res.status(201).json(expense);
    } catch (error) {
        return res.status(500).json({ message: "Error creating expense", error: error.message });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const { userId } = req.query;
        const query = userId ? { userId } : {};
        const expenses = await Expense.find(query).sort({ date: -1, createdAt: -1 });
        return res.json(expenses);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching expenses", error: error.message });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Expense not found" });
        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ message: "Error updating expense", error: error.message });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const deleted = await Expense.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Expense not found" });
        return res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting expense", error: error.message });
    }
};
