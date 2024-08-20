import  { Schema , model } from "mongoose"

const userSchema = new Schema({
    fullName : {
        type : String,
        require :true
    },
    email : {
        type : String,
        require :true,
        unique :true
    },
    password : {
        type : String,
        require :true,
    },
    dob : {
        type : Date,
        require :true
    },
    
    
},
{
    timestamps :true
});

const User = model("User" , userSchema);

export default User;