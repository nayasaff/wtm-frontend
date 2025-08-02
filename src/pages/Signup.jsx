import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';


const Signup = () =>{

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()


    const handelSignup = async() =>{
      let response;
      try {
        response = await axios.post(`http://localhost:8000/signup`, {
          email,
          password,
          fullName : name
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

        if(response?.data?.statusCode === 200) {
            localStorage.setItem("token", response.data.access_token)
          localStorage.setItem("role", response.data.role)
          navigate("/home")
        }
        else {
          setError(response?.data.message)
        }

      }
      catch(err){
        const {message} = err.response?.data
        if(message instanceof Array){
          setError(message[0])
        }
        else {
          setError(message)
        }
      }
    }

    return (
         <section className=" ">
      <div className="flex flex-col items-center justify-center sm:px-6 px-2 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Sign In Access
            </h1>
              {error && <div className="flex text-red-600 justify-between items-center py-2 px-2 bg-error rounded-md border border-red-600">
              <p className="text-red-600">
                {error}
              </p>
              <ClearIcon onClick={()=> setError()} sx={{cursor : "pointer"}}/>
            </div>}
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
                <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="fullName"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="John Doe"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
                <a
                  href=""
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="text-white bg-primary py-1.5 px-4 rounded  w-full"
                onClick={()=> handelSignup()}
              >
                SignUp
              </button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to="/login">
                <span
                  className="font-medium text-primary hover:underline"
                >
                  Log in
                </span>
                </Link>
              </p>
          </div>
        </div>
      </div>
    </section>
    )

    //    <section className=" dark:bg-gray-800">
    //   <div className="flex flex-col items-center justify-center sm:px-6 px-2 mx-auto h-screen">
    //     <img
    //       className="w-10 h-10 mr-2"
    //       src="https://www.svgrepo.com/show/335276/oldelectrum-logo.svg"
    //       alt="osher.ai logo"
    //     />

    //     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //       <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
    //           Sign In Access
    //         </h1>
    //         <form
    //           className="space-y-4 md:space-y-6"
    //           method="POST"
    //           action="/auth/login/"
    //         >
    //           <div>
    //             <label
    //               for="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Email
    //             </label>
    //             <input
    //               type="email"
    //               name="login"
    //               id="email"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="name@company.com"
    //               required=""
    //             />
    //           </div>
    //             <div>
    //             <label
    //               for="email"
    //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Full Name
    //             </label>
    //             <input
    //               type="fullName"
    //               name="login"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               placeholder="John Doe"
    //               required=""
    //             />
    //           </div>
    //           <div>
    //             <label
    //               for="password"
    //               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Password
    //             </label>
    //             <input
    //               type="password"
    //               name="password"
    //               placeholder="••••••••"
    //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //               required=""
    //             />
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-start"></div>
    //             <a
    //               href=""
    //               className="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>

    //           <button
    //             type="submit"
    //             className="text-white bg-teal-600 py-1.5 px-4 rounded  w-full"
    //           >
    //             SignUp
    //           </button>

    //           <p className="text-sm text-center text-gray-500 dark:text-gray-400">
    //             Already have an account?{" "}
    //             <Link to="/login">
    //             <span
    //               className="font-medium text-teal-600 hover:underline dark:text-teal-500"
    //             >
    //               Log in
    //             </span>
    //             </Link>
    //           </p>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
}

export default Signup