import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useSelector } from "react-redux";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  console.log(showDropDown);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // toggle dropdown
  const handleToggle = (e) => {
    setShowDropDown((prev) => !prev);
  };
  //  close dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => setShowDropDown(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-slate-200 shadow-md h-20">
      <div className=" self-center max-w-6xl mx-auto p-3 md:h-16 flex flex-row justify-between items-center">
        <Link to="/">
          <p className="font-extrabold text-sm sm:text-xl flex">
            <span className="text-slate-500">BICYCLE</span>
            <span className="text-slate-700">RENTALS</span>
          </p>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 flex rounded-md items-center p-2"
        >
          <input
            className="bg-transparent w-36 focus:outline-none sm:w-44 md:w-56"
            placeholder="search our Web..."
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
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>
          <Link to={currentUser ? "/profile" : "/sign-in"}>
            {currentUser ? (
              <img
                className="h-7 w-7 rounded-full object-cover ring-2"
                src={currentUser.avatar}
                alt="avatar"
              />
            ) : (
              <li className="hover:underline">SignIn</li>
            )}
          </Link>
          <div className="sm:hidden">
            <button onClick={handleToggle} type="button">
              <MdOutlineArrowDropDownCircle className="text-sky-800 h-6 w-6" />
            </button>
          </div>
          <ul
            hidden={showDropDown === false}
            className="absolute top-[13%] right-[13%] ring-2 h-20 w-16 p-2 rounded-s-sm sm:hidden"
          >
            <Link to="/">
              <li className="">Home</li>
            </Link>
            <Link to="/about">
              <li className="">About</li>
            </Link>
          </ul>
        </ul>
      </div>
    </header>
  );
};
