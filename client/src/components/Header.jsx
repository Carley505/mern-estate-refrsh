import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux"

export const Header = () => {
  const { currentUser } = useSelector((state)=>state.user)
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-6xl mx-auto p-3 md:h-16 flex flex-row justify-between items-center">
        <Link to='/'>
        <p className="font-extrabold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Canon</span>
          <span className="text-slate-700">Estate</span>
        </p>
        </Link>
        <form className="bg-slate-100 flex rounded-md items-center p-2">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            placeholder="search..."
            type="text"
            id="search"
          />
          <FaSearch />
        </form>
        <ul className="flex flex-row w-1/4 gap-2">
          <Link to="/">
             <li className="hidden sm:inline hover:underline">
               Home
             </li>
          </Link>
          <Link to="/about">
             <li className="hidden sm:inline hover:underline">
               About
             </li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            { currentUser ? <img className="h-7 w-7 rounded-full object-cover ring-2" src={currentUser.avatar} alt="avatar"/> :  <li className="hover:underline">SignIn</li> }
          </Link>
        </ul>
      </div>
    </header>
  );
};
