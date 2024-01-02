import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    code: "",
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
  console.log(`code - ${formData.code}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("check");
    try {
      const response = await fetch("http://192.168.0.106:3000/auth/verify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message);
        console.log("Data submitted successfully");

        navigate("/recover/reset");
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
    <form
      class="max-w-md w-full mx-auto min-h-full top-0.5 left-2 p-4"
      onSubmit={handleSubmit}
    >
      <div class="w-svw h-svh pt-4 relative">
        <div class="relative z-0 w-full mb-3 group">
          <input
            type="text"
            name="code"
            id="code"
            value={formData.code}
            onChange={handleChange}
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-nlack dark:border-gray-600 dark:focus:border-gray-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="password"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-900 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter OTP
          </label>
        </div>

        <div class="relative z-0 w-full mb-3 group">
          <div class="text-stone-400 text-sm font-medium">
            Back to Login ? <a href="/login">Login</a>
          </div>
        </div>

        <div class="relative z-0 w-full mb-5 group ">
                  <div class="w-2/5 h-12 left-0 bg-orange-400 mx-auto flex items-center justify-center rounded-lg items-center shadow border border-emerald-200 focus:ring-4 focus:outline-none hover:bg-orange-500">
                    <button
                      type="submit"
                      class="text-lg px-5 py-2.5 text-center text-black font-bold font-['Lexend Deca'] leading-tight"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
      </div>
      {responseMessage && (
        <div className="p-0.5 bg-green-200 text-lg text-center text-bold font-['Lexend Deca'] leading-tight items-center text-green-800 rounded-md">
          {" "}
          {responseMessage}
        </div>
      )}
    </form>
  );
};

export default Login;
