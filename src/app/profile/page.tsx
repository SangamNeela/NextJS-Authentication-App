'use client';
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react"
import axios from "axios";
interface UserData {
    username: string;
    email: string;
    isAdmin:boolean;
    isVerified:boolean;
  }
  
export default function Profile(){
    const [data,setData]=useState<UserData|null>(null);
    const router=useRouter();
    async function me(){
        const response = await axios.get("/api/users/me");
        console.log("user data response = ",response.data.userData);
        setData(response.data.userData); 
    }

    async function onLogout(){
        const res= await axios.get("/api/users/logout");
        console.log(res);
        if(res.data.success){
            router.push("/login");
        }
    }
    useEffect(()=>{
        me();
    },[])
    return(
<>
<div
    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src='https://img.freepik.com/premium-vector/avatar_810726-3.jpg' alt='Woman looking front'/>
    </div>
    <div className="text-center mt-2">
        {data?<h2 className="font-semibold">{data.username}</h2>:<></>}
        {data?<p className="text-gray-500">{data.email}</p>:<></>}
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex  items-center justify-around">
        <li className="flex items-center justify-between">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            {data && data.isVerified ?<div>verified account</div>:<div>not verified</div>}
        </li>
    </ul>
    <div className="p-4 border-t mx-8 mt-2">
        <button onClick={onLogout} className="w-1/2 block mx-auto rounded-full bg-blue-700 hover:bg-blue-800 font-semibold text-white px-6 py-2">Logout</button>
    </div>
</div>
</>
    )
}

