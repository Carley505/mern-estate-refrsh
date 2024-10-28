
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    setLoading(true)
    setError(null)
    const url = "/api/auth/signup"

    await fetch(url, {
      method: "POST",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      if(data.success === false){
        setLoading(false)
        setError(data.message)
      }else{
        setLoading(false)
        navigate("/sign-in")
      }
    }).catch((error)=>{
      setLoading(false)
      setError(error.message)
    })
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h2 className='text-center font-semibold text-3xl my-7'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='p-4 border rounded-lg focus:outline-none' id='username' placeholder='username' type='text' onChange={handleChange} value={formData.username || ''} />
        <input className='p-4 border rounded-lg focus:outline-none' id='email' placeholder='email' type='text' onChange={handleChange} value={formData.email || ''} />
        <input className='p-4 border rounded-lg focus:outline-none' id='password' placeholder='password' type='password' onChange={handleChange} value={formData.password || ''} />
        <button disabled={loading} className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? "Loading..." : "Sign Up" }
        </button>
        <OAuth />
      </form>
      <p className='mt-4'>Have an account? <span className='text-sky-600'><Link to="/sign-in">Sign in</Link></span></p>
      { error && <p className='text-red-600 mt-4'>{error}</p> }
    </div>
  )
}
