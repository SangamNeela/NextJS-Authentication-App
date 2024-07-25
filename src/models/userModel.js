import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
});

const User= mongoose.models.users || mongoose.model("users",userSchema);

export default User;