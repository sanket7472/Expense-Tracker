import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { createTransaction, getTransactions } from './controllers/transaction.js'

import Transaction from './models/Transaction.js'
import { SignUp , SignIn } from './controllers/user.js'

const app = express()
app.use(express.json())
app.use(cors())

const ConnectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn) {
        console.log('MongoDB Connected')
    } else {
        console.log('Failed to Connect')
    }
}
ConnectDB();

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: "Server is running"
    }) // added closing parenthesis
})

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Welcome to the Expense Tracker API'
    })
})

app.get('/transactions', getTransactions)
app.post('/transaction', createTransaction)

app.post('/signup', SignUp)
app.post('/signin', SignIn)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})