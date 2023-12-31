import React, { useState } from "react";
// import "../index.css";

import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    displayName: "",
    title: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(`role - ${formData.role}`);
  // console.log(`phone - ${formData.phone}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("check");
    try {
      const response = await fetch("http://192.168.0.106:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
        console.log("Data submitted successfully");

        navigate('/login')
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message);
        console.error("Failed to submit data");
      }

    } catch (error) {
      setResponseMessage("An error occurred while submitting the form.");
      console.error("Error submitting data:", error);
    }
  };

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
          <form
            onSubmit={handleSubmit}
            class="max-w-md mx-auto min-h-full top-0.5 left-2 p-4"
          >
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
                  value={formData.fullName}
                  onChange={handleChange}
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-red-500 peer"
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
                  value={formData.displayName}
                  onChange={handleChange}
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
                  value={formData.title}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                    value={formData.phone}
                    onChange={handleChange}
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="phone"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number +91
                  </label>
                  {/* <div class="text-red-500 text-sm">email is required</div> */}
                </div>

                <div class="relative z-0 w-full mb-3 group">
                  {/* <label
                    for="role"
                    // class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  > </label> */}

                  {/* <select
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      class=" block py-2.5 px-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:text-black"
                    />
               
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select> */}

                  <div class="flex items-center ps-4  dark:border-gray-700">
                    <input
                      id="bordered-radio-1"
                      type="radio"
                      value="admin"
                      name="role"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="bordered-radio-1"
                      class="w-full py-1.5 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Admin
                    </label>
                  </div>
                  <div class="flex items-center ps-4  dark:border-gray-700">
                    <input
                      id="bordered-radio-2"
                      type="radio"
                      name="role"
                      value="employee"
                      checked={formData.role === "employee"}
                      onChange={handleChange}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="bordered-radio-2"
                      class="w-full py-1.5 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Employee
                    </label>
                  </div>
                </div>
              </div>
              <div class="relative z-0 w-full mb-3 group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
            {responseMessage && (<div className=  "p-0.5 bg-green-200 text-lg text-center text-bold font-['Lexend Deca'] leading-tight items-center text-green-800 rounded-md"> {responseMessage}</div>)}
          </form>
           
        </div>
      </div>
    </div>
  );
}
