// login

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const [CurrentState, SetCurrentState] = useState("Login");

  const { backendUrl, Navigate, SetToken, Token } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  {
    /* prevent form reloading page when submitting */
  }
  const OnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (CurrentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/signup", {
          name,
          email,
          password: pass,
        });
        console.log(response.data);
        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password: pass,
        });
        console.log(response.data);
        if (response.data.success) {
          SetToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (Token) {
      Navigate("/");
    }
  }, [Token, Navigate]);

  return (
    <form
      onSubmit={OnSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* login and sign up */}
      <div className="inline-flex items-center gap-4 mb-2 mt-10">
        <p className="prata-regular text-3xl">{CurrentState}</p>
        <hr className="border-none h-1.5 w-8 bg-gray-800" />
      </div>
      {CurrentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        required
      />
      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer">Forgot Your Password</p>
        {CurrentState === "Login" ? (
          <p
            onClick={() => {
              SetCurrentState("Sign Up");
            }}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => {
              SetCurrentState("Login");
            }}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {CurrentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
