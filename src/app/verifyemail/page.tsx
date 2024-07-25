'use client'
import { useState,useEffect } from "react"
import { useSearchParams,useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { TbSparkles } from "react-icons/tb";

export default function VerfyEmail(){
    const navRouter=useRouter();
    const router=useSearchParams();
    const [token,setToken]=useState(null);
    const [error,setError]=useState(false);
    const [verified,setVerified]=useState(false);
    let userNotFound=false;
    
    async function tokenVerifier(token:any){
        try {
            if(token && verified==false)
            {
                const reponse = await axios.post("/api/users/verifyemail",{token});
                console.log("response = ",reponse)
                if(reponse.data.success){
                    setVerified(true);
                }
                else{
                    navRouter.push("/emailNotVerified");
                }
            }   
        } catch (error) {
            setError(true);
        }
    }
    console.log("vrified = ",verified);
    useEffect(()=>{
        const query=router.get("token");
        const urltoken:any=query;
        if(urltoken){
            tokenVerifier(urltoken);
        }
    },[]);
    // if(!verified ){
    //    
    // }
    return (
        <div className="min-h-svh flex flex-col justify-center items-center">
            
            {
                !verified?
                
                <></>
                :
                <>
                <div className="flex gap-2 items-center">
                    <TbSparkles className="text-6xl"/>
                    <h1 className="sm:text-sm lg:text-3xl  mb-2  font-medium text-gray-900 dark:text-white ">YAY,email address is verified</h1>
                    <h1 className="text-3xl sm:text-sm mb-2  font-medium text-gray-900 dark:text-white"></h1>
                    <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white"></p>
                </div>
                
                <Link className="underline" href={"/login"}>click to login</Link>
                </>
                
            }
            {
                error?<p>error</p>:<></>
            }
        </div>
    )
}