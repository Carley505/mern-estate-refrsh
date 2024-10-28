
import React from 'react'
import { auth, provider, signInWithPopup } from '../firebase'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"

export default function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick = async() =>{
        dispatch(signInStart())
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
            }).then((response)=>{
                return response.json()
            }).then((data)=>{
                if(data.success === false){
                    dispatch(signInFailure(data.message))
                    return;
                }else{
                    navigate("/")
                    dispatch(signInSuccess(data))
                    return;
                }
            }).catch((error)=>{
                dispatch(signInFailure(error.message))
            })
        } catch (error) {
            console.log("Could not sign in with google. ", error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 w-full text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
      continue with google
    </button>

  )
}
