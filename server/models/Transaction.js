import { Schema , model } from "mongoose";

const transactionSchema =new Schema({
    title :{
        type :String,
        require :true,
    },
    amount :{
        type :Number,
        require :true,
    },
    category :{
        type :String,
        default : "Other",
    },
    type :{
        type :String,
        enum : ["debit" , "credit"],
    },
    user:{
        type :Schema.Types.ObjectId,
        ref : "User,",
        require: true
    }
},
{
    timestamps :true
});

const Transaction = model("Transaction",transactionSchema);

export default Transaction;