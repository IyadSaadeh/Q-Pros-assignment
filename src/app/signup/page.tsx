"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            setButtonDisabled(true);

            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10 ">
        <div className="flex shadow-md">
          <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-96 h-96">
            <div className="w-72">
              <h1 className="text-xl font-semibold">{buttonDisabled?"Enter your Details":loading ? "Processing" : "Signup"}</h1>
              
  
              <form className="mt-4">
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    UserName
                  </label>
                  <input
                    id="username"
                    type="text"
                    
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              placeholder="enter your username"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="*****"
                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                
                <div className="mb-3">
                  <button
                    onClick={onSignup}
                    className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <div className="text-center">
                <span className="text-xs text-gray-400 font-semibold">
                 Do You have an Account ?
                </span>
                <Link
                  href="/login"
                  className="text-xs font-semibold text-purple-700"
                >
                  login
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap content-center justify-center rounded-r-md w-96 h-96">
            <img
              className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
              src="http://bit.ly/3RDmQ22"
              alt="Login Banner"
            ></img>
          </div>
        </div>
      </div>
    )

}