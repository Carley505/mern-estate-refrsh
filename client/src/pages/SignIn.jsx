import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { signInStart, signInFailure, signInSuccess } from '../redux/appSlices/userSlice.js'
import OAuth from "../components/OAuth.jsx"

export const SignIn = () => {
  const [formData, setFormData] = useState({})
  
  const { loading, error } = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

    dispatch(signInStart())
    const url = '/api/auth/signin'

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response)=>{
        return response.json()
      }).then((data)=>{
       if(data.success === false){
        dispatch(signInFailure(data.message));
       }else{
        navigate("/")
        dispatch(signInSuccess(data))
       }
      }).catch((error)=>{
        dispatch(signInFailure(error.message))
      })
  }
  return (
    <div className='p-4 max-w-lg mx-auto'>
      <h2 className='text-center font-semibold text-3xl my-7'>Sign In</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input className='p-4 border rounded-lg focus:outline-none' id='email' placeholder='email' type='text' onChange={handleChange} value={formData.email || ''} />
        <input className='p-4 border rounded-lg focus:outline-none' id='password' placeholder='password' type='password' onChange={handleChange} value={formData.password || ''} />
        <button disabled={loading} className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? "Loading..." : "Sign In" }
        </button>
        <OAuth />
      </form>
      <p className='mt-4'>Dont have an account? <span className='text-sky-600'><Link to="/sign-up">Sign up</Link></span></p>
      { error && <p className='text-red-600 mt-4'>{error}</p> }
    </div>
  )
}
