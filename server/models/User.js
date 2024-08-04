import {Schema , model} from 'mongoose'

const UserSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    DOB :  {
        type: String,
        required: true
        
    }

},
{
    timestamp: true
})

const user = model( 'user', UserSchema)
export default user