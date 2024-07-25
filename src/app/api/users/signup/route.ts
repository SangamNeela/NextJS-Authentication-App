import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import sendMail from "@/helpers/mailer";
import { connectDB } from "@/dbConn/connection";
export async function POST(req:NextRequest){
    try {
        connectDB();
        const {email,username,password}=await  req.json();
        console.log(email,username,password);
        const user = await User.findOne({email});
        if(user!==null){
            return NextResponse.json({error:"User not found"});
        }

        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password, salt);

        const newUser=await User.create({
            username:username,
            email:email,
            password:hashedPassword,

        })

        console.log("new User = ",newUser);

        //send verification email
        await sendMail(email,"VERIFY",newUser._id.toString());

        return NextResponse.json({message:"user registered successfully", success:true})


    } catch (error) {
        console.log("error while sign up process ",error);
    }


}