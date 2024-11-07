
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({bicycle}) {
  const [renter, setRenter] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (e) =>{
    setMessage(e.target.value)
  }

  useEffect(()=>{
    const id = bicycle.userRef
    const url = `/api/user/${id}`
    const fetchRenter = async(bicycle)=>{
      await fetch(url).then((response)=>{
        return response.json()
      }).then((data)=>{
        if(data.success === false){
          console.log(data.message)
          return
        }else{
          setRenter(data)
        }
      }).catch((error)=>{
        console.log(error.message)
      })
    }
    fetchRenter(bicycle)
  }, [bicycle.userRef])
  return (
    <>
     {
      renter && (
        <div className='space-y-2'>
        <p>Contact <span className='font-semibold'>{renter.username}</span> for <span className='font-semibold'>{bicycle.model}</span></p>
        <textarea value={message} onChange={handleChange} rows={3} className='w-full p-3 focus:outline-none ring-2 rounded-lg' placeholder='Message...'></textarea>
        <Link 
         to={`mailto:${renter.email}?subject=Regarding ${bicycle.name}&body=${message}`}
         className='bg-slate-700 block text-center w-full uppercase text-white py-2 rounded-md hover:opacity-95'
        >
          send message
        </Link>
        </div>
      )
     }
    </>
  )
}
