
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    setLoading(true);
    setError(null)

    const url = "/api/auth/signup";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        console.log("FAILED: ", data)
      }else{
        setLoading(false)
        setFormData({
          usename: '',
          email: '',
          password: ''
        });
        navigate('/sign-in')
        console.log("SUCCESS: ",data)
      }
    }).catch((error)=>{
      setError(error.message)
      setLoading(false)
      console.log("ERROR: ", error)
    });
  }

  return (
      <div className="max-w-lg mx-auto">
        <h2 className="text-center font-semibold text-3xl my-7">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="p-3 focus:outline-none border rounded-lg" type="text" id="username" placeholder="username" onChange={handleChange} value={formData.username || ''}/>
          <input className="p-3 focus:outline-none border rounded-lg" type="text" id="email" placeholder="email" onChange={handleChange} value={formData.email || ''}/>
          <input className="p-3 focus:outline-none border rounded-lg" type="password" id="password" placeholder="password" onChange={handleChange} value={formData.password || ''}/>
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80" type="submit">
            { loading ? "LOADING..." : "SIGN UP" }
          </button>
        </form>
        <button className="bg-red-700 w-full mt-4 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">CONTINUE WITH GOOGLE</button>
        <p className="mt-4">Have an account? <span className="text-sky-700"><Link to="/sign-in">Sign in</Link></span></p>
        { error && <p className="text-red-600 mt-4">{ error }</p> }
      </div>
  );
};
