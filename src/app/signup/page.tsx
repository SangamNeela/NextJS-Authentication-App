'use client'
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import Link from "next/link";
import axios from "axios";
export default function SignupPage(){
    const router=useRouter();
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    });

    useEffect(()=>{
        if(user.email.length>0 && user.username.length>0 && user.password.length>0){
            setDisableButton(false);
        }
        if(user.email.length==0 || user.username.length==0 || user.password.length==0){
            setDisableButton(true);
        }
    },[user.email,user.username,user.password,user]);

    const [loading,setLoading]=useState(false);
    const [disableButton,setDisableButton]=useState(true);

    const onSignup= async (e:any)=>{
        e.preventDefault();
        try {
            console.log("sangam");
            setLoading(true);
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:user.email, username:user.username, password:user.password }),
              });
              const res=await response.json();
            console.log("response = ",res);
            router.push("/emailSent")
        } catch (error) {
            console.log("signup failed in frontend")
        }
    }

    return(
        <div className="flex  flex-shrink justify-center min-h-svh items-center">
            <form className="lg:min-w-96 sm:min-w-52" onSubmit={(event)=>onSignup(event)} method="post">

            {loading?
            <div>
                <svg className="animate-spin h-8 w-8 dark:text-white text-black mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>

                <span className="dark:text-white text-black text-2xl font-bold">processing...</span>
            </div>
            :
            <></>}
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your UserName</label>
                <input type="text"
                onChange={(e)=>setUser({...user,username:e.target.value})} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Karthik" required />
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" 
                onChange={(e)=>{setUser({...user,email:e.target.value})}}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com" required />
            </div>
            <div className="mb-5">
                <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input

                onChange={(e)=>setUser({...user,password:e.target.value})} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
            </div>
            {disableButton?
            <button type="submit"  className="cursor-not-allowed opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            :
            <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            }
            <div className="mt-2">
                <Link href={"/login"} className="font-semibold text-sm underline">click to Login</Link>
            </div>
            </form>

        </div>
    )
}