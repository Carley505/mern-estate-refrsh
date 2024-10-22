import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export const Header = () => {
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
          <li className="hidden sm:inline hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:underline">
            <Link to="/sign-in">SignIn</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
