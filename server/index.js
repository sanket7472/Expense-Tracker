import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT 

const ConnectDB =async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI)

    if (conn){
        console.log('MongoDB Connected')
    }
    else{
        console.log('Failed to Cannect')
    }
}
ConnectDB();
app.get('/health',(req,res)=>{

    res.json({
        status: 'ok',
        message: "Server is running"
    })

})
app.get('/',(req, res) =>{
    res.send('Hello World')
})

app.listen(PORT,()=>{
    console.log( `server is running on PORT ${PORT}`)
})