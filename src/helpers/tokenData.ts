import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

export const getTokenData=(req:NextRequest)=>{
    const token= req.cookies.get("jwttoken")?.value||"";
    const data:any= jwt.verify(token,process.env.SECRET_CODE!);
    return data.id;
}