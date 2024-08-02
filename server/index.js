import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000;
console.log(`server is running on ${PORT}`)


const ConnectDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    if (connect) {
        console.log("Connected to MongoDB...")
    }
    else {
        console.log("Failed to connect to MongoDB...")
    }
}
ConnectDb()



app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'

  })


})
