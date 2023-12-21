import * as React from "react";
import "../index.css";

export default function Form() {
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

        <div className="w-8/12 basis-1/2 w-96 bg-white p-6 px-2.5 py-2.5 top-0.5 rounded-r-3xl mx-auto overflow-hidden">
          <form class="max-w-md mx-auto min-h-full top-0.5 left-2 p-4">
            <div class="left-0 p-2 text-center text-black text-2xl font-bold font-['Lexend Deca']">
              <h1>Create Account</h1>
            </div>
            <div class="w-svw h-svh pt-4 relative">
              {/* <div class="left-0 absolute pb-10 text-center text-black text-2xl font-bold font-['Lexend Deca']">
              <h1>Create Account</h1>
            </div> */}
              <div class="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="fullName"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
                {/* <div class="text-red-500 text-sm">Full Name is required</div> */}
              </div>

              <div class="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name="displayName"
                  id="displayName"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="displayName"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Display Name
                </label>
                {/* <div class="text-red-500 text-sm">Display Name is required</div> */}
              </div>

              <div class="relative z-0 w-full mb-3 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="title"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
                {/* <div class="text-red-500 text-sm">Title is required</div> */}
              </div>

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
                {/* <div class="text-red-500 text-sm">email is required</div> */}
              </div>

              <div class="grid md:grid-cols-2 md:gap-4">
                <div class="relative z-0 w-full mb-3 group">
                  <input
                    type="tel"
                    name="phone"
                    id="floating_phone"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number +91
                  </label>
                  {/* <div class="text-red-500 text-sm">email is required</div> */}
                </div>

                <div class="relative z-0 w-full mb-3 group">
                  <label
                    for="role"
                    // class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></label>
                  <select
                    id="role"
                    class=" block py-2.5 px-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:text-black"
                  >
                    <option>Employee</option>
                    <option>Admin</option>
                  </select>
                </div>
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
                {/* <div class="text-red-500 text-sm">password is required</div> */}
              </div>
              <div class="relative z-0 w-full mb-3 group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="confirmPassword"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
                {/* <div class="text-red-500 text-sm">Password did not match</div> */}
              </div>

              <div class="relative z-0 w-full mb-3 group">
                <div class="text-stone-400 text-sm font-medium">
                  Already have an account ? <a href="/login">Login</a>
                </div>
              </div>

              <div class="relative z-0 w-full mb-5 group ">
                <div class="w-full h-14 left-0 bg-orange-400 flex items-center justify-center rounded-lg items-center shadow border border-emerald-200 focus:ring-4 focus:outline-none hover:bg-orange-500">
                  <button
                    type="submit"
                    class="text-sm px-5 py-2.5 text-center text-black text-xl font-bold font-['Lexend Deca'] leading-tight"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
