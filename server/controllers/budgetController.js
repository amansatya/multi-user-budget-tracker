import Budget from "../models/Budget.js";

export const createBudget = async (req, res) => {
    try {
        const { userId, month, maxAmount } = req.body;

        if (!userId || !month || maxAmount == null) {
            return res.status(400).json({ message: "userId, month, and maxAmount are required." });
        }

        const budget = await Budget.create({ userId, month, maxAmount });
        return res.status(201).json(budget);
    } catch (error) {
        return res.status(500).json({ message: "Error creating budget", error: error.message });
    }
};

export const getBudgets = async (req, res) => {
    try {
        const { userId, month } = req.query;
        const query = {};
        if (userId) query.userId = userId;
        if (month) query.month = month;

        const budgets = await Budget.find(query).sort({ month: -1, createdAt: -1 });
        return res.json(budgets);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching budgets", error: error.message });
    }
};

export const updateBudget = async (req, res) => {
    try {
        const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Budget not found" });
        return res.json(updated);
    } catch (error) {
        return res.status(500).json({ message: "Error updating budget", error: error.message });
    }
};

export const deleteBudget = async (req, res) => {
    try {
        const deleted = await Budget.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Budget not found" });
        return res.json({ message: "Budget deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting budget", error: error.message });
    }
};
