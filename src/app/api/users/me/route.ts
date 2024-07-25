import { NextRequest,NextResponse } from "next/server";
import { getTokenData } from "@/helpers/tokenData";
import User from "@/models/userModel";
export async function GET(req:NextRequest){
        const userId = getTokenData(req);
        const userDetails = await User.findOne({_id:userId}).select("-password");
        if(!userDetails){
            return NextResponse.json({message:"No User found"});
        }
        return NextResponse.json({messsage:"User found",success:true ,userData:userDetails});
}