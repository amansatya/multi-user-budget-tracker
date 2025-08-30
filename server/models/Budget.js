import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        month: {
            type: String,
            required: true,
            match: [/^(0[1-9]|1[0-2])-\d{4}$/, "Month must be in MM-YYYY format"],
        },
        maxAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

// Ensure one budget per user per month
budgetSchema.index({ userId: 1, month: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
