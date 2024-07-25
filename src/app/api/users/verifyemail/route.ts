import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/dbConn/connection";



export async function POST(req:NextRequest){
    try {
        connectDB();
        const reqBody=await req.json();
        const {token}=reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken:token , verifyTokenExpiry:{$gt:Date.now()}});
        if(!user){
            console.log("user not foundd");
            return NextResponse.json({error:"user not found",success:false});
        }

        console.log(user);
        user.isVerified=true;
        if(user.verifyTokenExpiry<Date.now()){
            user.verifyToken=undefined;
            user.verifyTokenExpiry=undefined;
        }
        await user.save();
        return NextResponse.json({message:"user verified successfully",success:true,user:user});

    } catch (error) {
        console.log("error occured while verifying the email");
        return NextResponse.json({error:"something unusall happened"});
    }
}