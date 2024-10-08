import User from "../models/User.js";
import Transaction from "./../models/Transaction.js"

const PostTransaction = async (req ,res) =>{
    const {amount , category ,type , user,title} = req.body;

    const transaction = new Transaction({
        title,
        amount,
        category,
        type,
        user
    });

    try{
        const savedTransaction = await transaction.save();

        res.json({
            success :true,
            message : `Transaction Successfull`,
            data :savedTransaction
        })
    }
    catch(e){
        res.json({
            success :false,
            message :e.message,
            data:null
        })
    }
}

const getTransaction = async(req,res) =>{
    const { userId } = req.query;

    const user = await User.findById(userId)

    if(!user){
        return res.json({
            success:true,
            message :`User Not Found`,
            data:null
        })
    }

const transactions = await Transaction.find({user : userId }).sort({createdAt: -1});

res.json({
    success :true,
    message:"Transaction Fetched Successfully",
    data :transactions
})
}

const deleteTransaction = async(req, res) =>{
    const {id} = req.params;
    await Transaction.deleteOne({_id: id});

    res.json({
        success :true,
        message: `Transaction deleted Successfully `,
        data : null
    })
}

export{
    PostTransaction,
    getTransaction,
    deleteTransaction
}