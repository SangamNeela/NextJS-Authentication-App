import { BiMailSend } from "react-icons/bi";
export default function EmailSent(){
    return(
        
<div className="h-screen flex items-center justify-center">
    <div className="max-w-sm mx-3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <BiMailSend className="text-7xl"/>
        <a href="#">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Email Sent to your Mail addresss</h5>
        </a>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">please click on the verify button in the  email we just 
            sent you to confirm your email address.</p>
    </div>
</div>

    )
}