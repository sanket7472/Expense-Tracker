import Transaction from "../models/Transaction.js";


const createTransaction = async (req, res) => {
    const { title, Amount, Type, category, date, user } = req.body;
    const transaction =
        new Transaction({
            title,
            Amount,
            Type,
            category,
            date,
            user
        });

    try {
        const savedTransaction = await transaction.save();
        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            transaction: savedTransaction
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating transaction",
            error: err.message
        })
    }
}
const getTransactions = async (req, res) => {
    const { id } = req.user;

    const transactions = await Transaction.find({ user: id });
    res.status(200).json({ transactions });
}
export {
    createTransaction,
    getTransactions
};

