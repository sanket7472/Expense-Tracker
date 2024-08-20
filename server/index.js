import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import { PostSignUp , PostLogin } from "./controllers/user.js";
import {PostTransaction ,getTransaction, deleteTransaction} from "./controllers/transaction.js"


const app = express()
app.use(express.json());
app.use(cors());


const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if (conn) {
        console.log(`MongoDB connected Successfully..📦`);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to expense Tracker"
    })
})

app.post("/signup",PostSignUp )

app.post("/login", PostLogin)

app.post("/transaction", PostTransaction)
app.get("/transactions", getTransaction)
app.delete("/transaction/:id", deleteTransaction)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
})
