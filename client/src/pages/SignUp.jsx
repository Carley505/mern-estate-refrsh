import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
      <div className="max-w-lg mx-auto">
        <h2 className="text-center font-semibold text-3xl my-7">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input className="p-3 focus:outline-none border rounded-lg" type="text" id="username" placeholder="username"/>
          <input className="p-3 focus:outline-none border rounded-lg" type="text" id="email" placeholder="email"/>
          <input className="p-3 focus:outline-none border rounded-lg" type="password" id="password" placeholder="password"/>
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">SIGN UP</button>
          <button className="bg-red-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">CONTINUE WITH GOOGLE</button>
        </form>
        <p className="mt-4">Have an account? <span className="text-sky-700"><Link to="/sign-in">Sign in</Link></span></p>
      </div>
  );
};
