"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] :any = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data)
    }

    return (
       
            <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src="http://bit.ly/3RDmQ22"
              alt="Profile picture"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">{data["_id"] === 'nothing' ? "Nothing" : <Link href={`/profile/${data["_id"]}`}>{data["_id"]}
            </Link>}</h2>
            
            <h2 className="text-center text-2xl font-semibold mt-3">{data.username}</h2>
            <p className="text-center text-gray-600 mt-1">{data.email}</p>
            <div className="flex justify-center mt-5">
              <button onClick={logout} className="text-blue-500 hover:text-blue-700 mx-3">
              Logout
              </button>
              <button onClick={getUserDetails} className="text-blue-500 hover:text-blue-700 mx-3">
              GetUser Details
              </button>
             
            </div>
            
          </div>
    )
}