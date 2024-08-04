import { Schema, model } from 'mongoose'

const TransactionSchema = new Schema({
    Amount: {
        type: Number,
        required: true

    },
    category: {
        type: String,
        default: "Others"
    },
    Type: {
        type: String,
        required: true,
        enum: ['debit', 'credit']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    }
},
    {
        timestamp: true
    })

const transaction = model('transaction', TransactionSchema)

export default transaction