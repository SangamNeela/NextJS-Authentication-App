import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/dbConn/connection";
import jwt from "jsonwebtoken";

export async function POST(req:NextRequest){
    try {
        connectDB();
        const reqBody=await req.json();
        console.log("req body",reqBody);
        const {email,password}=reqBody;
        console.log("sangam from login backend",email);

        const user = await User.findOne({email:email});
        console.log("from login = ",user)
        if(user===null){
            return NextResponse.json({message:"user doesnt exists please signup",success:false});
        }
        const validatePassword = await bcryptjs.compare(password,user.password);
        if(!validatePassword){
            return NextResponse.json({message:"please enter correct password",success:false});
        }
        const payload={
            email,
            password,
            id:user._id,
            username:user.username,
        }
        const jwtToken = jwt.sign(payload,process.env.SECRET_CODE!,{expiresIn:'1d'});
        let response=NextResponse.json({message:"user logged in successfully",success:true});
        response.cookies.set("jwttoken",jwtToken,{httpOnly:true});
        return response;
    } catch (error) {
        return NextResponse.json({err:"error occures "+error});
    }
}