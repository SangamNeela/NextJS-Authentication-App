'use client'
import axios from "axios"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login(){
    const router=useRouter();
    const [disableButton,setDisableButton]=useState(true);
    const [wrongDetails,setWrongDetails]=useState(false);
    const [processing,setProcessing]=useState(false);
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setDisableButton(false);
        }
        if(user.email.length==0  || user.password.length==0){
            setDisableButton(true);
        }
    },[user.email,user.password])
    async function onLogin(e:any){
        e.preventDefault();
        setProcessing(true);
        const response = await axios.post("/api/users/login",user);
        console.log("respone login",response.data.success);
        if(response.data.success){
            setWrongDetails(false);
            router.push("/profile");
        }
        else{
            setWrongDetails(true);
            setProcessing(false);
        }
    }
    return (
        <div>
        <div className="min-h-svh flex justify-center items-center">
            <form className="lg:min-w-96 sm:min-w-52" onSubmit={(e)=>onLogin(e)}>
                {
                    processing?
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
                    :<></>
                }
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" 
                    onChange={(e)=>{setUser({...user,email:e.target.value})}}
                    name="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password"
                    onChange={(e)=>{setUser({...user,password:e.target.value})}} 
                    name="password" 
                    id="password" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required />
                </div>

                {disableButton?
                <button type="submit"  className="cursor-not-allowed opacity-50 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                :
                <button type="submit" className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                }
                {
                    wrongDetails?<h1 className="text-sm font-semibold text-orange-700 mt-2">incorrect password or email</h1>:<></>
                }
                <div className="mt-2">
                <Link href={"/signup"} className="font-semibold text-sm underline">Click to Sign Up</Link>
                </div>
            </form>
        </div>
        </div>
    )
}