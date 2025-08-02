import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState()
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.statusCode === 200) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        navigate("/home");
      }
      else {
        setError(response?.data.message)
      }
    } catch (err) {
        const {message} = err.response?.data
        if(message instanceof Array){
          setError(message[0])
        }
        else {
          setError(message)
        }
      }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
              Log In Access
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
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="login"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                placeholder="name@company.com"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
              <a
                href=""
                class="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              class="text-white bg-primary py-1.5 px-4 rounded  w-full"
              onClick={() => handleLogin()}
            >
              LogIn
            </button>

            <p class="text-sm text-center text-gray-500">
              Not a member yet?{" "}
              <Link to="/signup">
                <span className="font-medium text-primary hover:underline">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  //  <section className=" dark:bg-gray-800">
  //     <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
  //       <img
  //         className="w-10 h-10 mr-2"
  //         src="https://www.svgrepo.com/show/335276/oldelectrum-logo.svg"
  //         alt="osher.ai logo"
  //       />

  //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
  //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
  //             Log In Access
  //           </h1>
  //           <form
  //             className="space-y-4 md:space-y-6"
  //             method="POST"
  //             action="/auth/login/"
  //           >
  //             <div>
  //               <label
  //                 for="email"
  //                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //               >
  //                 Email
  //               </label>
  //               <input
  //                 type="email"
  //                 name="login"
  //                 id="email"
  //                 value={email}
  //                 onChange={(e)=> setEmail(e.target.value)}
  //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                 placeholder="name@company.com"
  //               />
  //             </div>
  //             <div>
  //               <label
  //                 for="password"
  //                 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //               >
  //                 Password
  //               </label>
  //               <input
  //                 type="password"
  //                 name="password"
  //                 value={password}
  //                 onChange={(e)=> setPassword(e.target.value)}
  //                 placeholder="••••••••"
  //                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //                 required=""
  //               />
  //             </div>
  //             <div class="flex items-center justify-between">
  //               <div class="flex items-start"></div>
  //               <a
  //                 href=""
  //                 class="text-sm font-medium text-teal-600 hover:underline dark:text-teal-500"
  //               >
  //                 Forgot password?
  //               </a>
  //             </div>

  //             <button
  //               type="submit"
  //               class="text-white bg-teal-600 py-1.5 px-4 rounded  w-full"
  //             >
  //               LogIn
  //             </button>

  //             <p class="text-sm text-center text-gray-500 dark:text-gray-400">
  //               Not a member yet?{" "}
  //               <Link to="/signup">
  //               <span
  //                 className="font-medium text-teal-600 hover:underline dark:text-teal-500"
  //               >
  //                 Sign up
  //                 </span>
  //               </Link>
  //             </p>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
};

export default Login;
