import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3000
const ConnectDB =async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn){
        console.log('MongoDB Connected')
    }
    else{
        console.log('Failed to Cannect')
    }
}


app.get('/',(req, res) =>{
    res.send('Hello World')
})