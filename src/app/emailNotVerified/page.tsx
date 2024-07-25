import Link from "next/link"
export default function (){
    return(
                <div className="h-screen flex justify-center items-center">
                    <div className="flex flex-col items-center">
                    <p className=" mt-2 text-lg font-semibold  text-orange-500">The email verification link has expired</p>
                    <p className="mb-1 text-sm font-medium text-gray-900 dark:text-white">please signup here</p>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <Link href={"/signup"}>
                        SignUp
                        </Link>
                    </button>
                    </div>
                </div>
            )
}