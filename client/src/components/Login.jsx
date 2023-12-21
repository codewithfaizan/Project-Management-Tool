import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
        <div class="container basis-full mx-auto box-border flex flex-row max-w-fit items-center justify-self-center bg-orange-400 rounded-3xl shadow-xl">
          <div className="basis-1/2 justify-tems-start p-6">
            <div class="w-96 p-2 mt-4 text-white text-5xl font-bold font-['Lexend Deca'] leading-10 tracking-widest">
              <h1>
                Project <br />
                Management <br />
                Tool
              </h1>
            </div>
            <div class="w-96 h-16 p-8 text-white text-2xl font-normal font-['Lexend Deca']">
              <p>Track your Projects</p>
            </div>
          </div>
  
          <div className="basis-1/2 w-96 bg-white p-6 px-2.5 py-2.5 top-0.5 rounded-r-3xl mx-auto overflow-hidden">
            <form class="max-w-md w-full mx-auto min-h-full top-0.5 left-2 p-4">
              <div class="left-0 p-2 text-center text-black text-2xl font-bold font-['Lexend Deca']">
                <h1>Login</h1>
              </div>
              <div class="w-svw h-svh pt-4 relative">
                
                <div class="relative z-0 w-full mb-3 group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
             
                <div class="relative z-0 w-full mb-3 group">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-nlack dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
   
                <div class="relative z-0 w-full mb-3 group">
                  <div class="text-stone-400 text-sm font-medium">
                   Don't Have an Account ? <a href="/register">Register</a>
                  </div>
                </div>

                <div class="relative z-0 w-full mb-3 group ">
                  <div class="w-full h-14 left-0 bg-orange-400 flex items-center justify-center rounded-lg items-center shadow border border-emerald-200 focus:ring-4 focus:outline-none hover:bg-orange-500">
                    <button
                      type="submit"
                      class="text-sm px-5 py-2.5 text-center text-black text-xl font-bold font-['Lexend Deca'] leading-tight"
                    >
                      Login
                    </button>
                  </div>
                </div>

                <div class="relative z-0 w-full mb-3 group">
                  <div class="text-stone-400 text-sm font-medium">
                   Forget Password ? <a href="/recover">Reset</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login;
