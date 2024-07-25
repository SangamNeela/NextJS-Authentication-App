import { NextRequest,NextResponse } from "next/server";
export async function GET(req:NextRequest){
    try {
        const response = NextResponse.json({message:"user logged out successfully",success:true});
        response.cookies.set("jwttoken",'',{httpOnly:true,expires:new Date(0)});
        return response;
    } catch (error) {
        console.log("error while loggin out user",error);
        return NextResponse.json({message:"error while loggin out user",success:false})
    }
}