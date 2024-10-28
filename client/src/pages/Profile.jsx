
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { updateStart, updateFailure, updateSuccess } from '../redux/user/user.slice';

export const Profile = () => {
  const [formData, setFormData] = useState({});

  const { loading, error, currentUser } = useSelector((state)=>state.user.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    dispatch(updateStart())
    const url = "/api/auth/update-user"

    await fetch(url, {
      method: "PATCH",
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      if(data.success === false){
       dispatch(updateFailure(data.message))
      }else{
        dispatch(updateSuccess(data))
      }
    }).catch((error)=>{
      dispatch(updateFailure(error.message))
    })
  }

  const handleCreateListing = async() =>{

  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
        <h2 className='text-center font-semibold text-3xl my-7'>Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <img className='h-24 w-24 object-cover cursor-pointer rounded-full ring-2 self-center' src={currentUser.avatar} alt='avatar'/>
        <input className='p-4 border rounded-lg focus:outline-none' id='username' placeholder='username' type='text' onChange={handleChange} value={formData.username || ''} />
        <input className='p-4 border rounded-lg focus:outline-none' id='email' placeholder='email' type='text' onChange={handleChange} value={formData.email || ''} />
        <input className='p-4 border rounded-lg focus:outline-none' id='password' placeholder='password' type='password' onChange={handleChange} value={formData.password || ''} />
        <button disabled={loading} className='bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? "Loading..." : "Update" }
        </button>
        <button type='button' onClick={handleCreateListing} disabled={loading} className='bg-green-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          { loading ? "Loading..." : "Create Listing" }
        </button>
      </form>
      <div className='text-red-700 mt-4 flex justify-between'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      { error && <p className='text-red-600 mt-4'>{error}</p> }
    </div>
  )
}
