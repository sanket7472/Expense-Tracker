import Transaction from "../models/Transaction.js";


const createTransaction = async (req, res) => {
    const { title, amount , type, category, description, date } = req.body;
    const transaction = await Transaction.create({ title, amount , type, category, description, date });
    
    res.status(201).json({ transaction });
}
const getTransactions = async (req, res) => {
    const { id } = req.user;

    const transactions = await Transaction.find({ user: id });
    res.status(200).json({ transactions });
}
export { createTransaction, getTransactions };

