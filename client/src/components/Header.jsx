import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux"

export const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { currentUser } = useSelector((state)=>state.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-6xl mx-auto p-3 md:h-16 flex flex-row justify-between items-center">
        <Link to='/'>
        <p className="font-extrabold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">BICYCLE</span>
          <span className="text-slate-700">RENTALS</span>
        </p>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 flex rounded-md items-center p-2">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            placeholder="search..."
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>  
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
