import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { userId, month, maxAmount } = req.body;

        const newBudget = new Budget({ userId, month, maxAmount });
        await newBudget.save();

        res.status(201).json(newBudget);
    } catch (error) {
        res.status(500).json({ message: "Error creating budget", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching budgets", error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedBudget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedBudget) return res.status(404).json({ message: "Budget not found" });

        res.json(updatedBudget);
    } catch (error) {
        res.status(500).json({ message: "Error updating budget", error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
        if (!deletedBudget) return res.status(404).json({ message: "Budget not found" });

        res.json({ message: "Budget deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting budget", error });
    }
});

export default router;
