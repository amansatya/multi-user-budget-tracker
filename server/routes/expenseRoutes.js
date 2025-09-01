import express from "express";
import {createExpense, getExpenses, updateExpense, deleteExpense,} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);      // 3-dots → Edit
router.delete("/:id", deleteExpense);   // 3-dots → Delete

export default router;
