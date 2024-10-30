
import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { updateStart, updateFailure, updateSuccess } from '../redux/appSlices/userSlice';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { app } from '../firebase';

export const Profile = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [fileUploadPerc, setFileUploadPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const fileRef = useRef(null);

  const { loading, error, currentUser } = useSelector((state)=>state.user)

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

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) =>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        setFileUploadPerc(Math.round(progress));
      },
      (error)=>{
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormData({
            ...formData,
            avatar: downloadUrl
          })
        })
      }
    )
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
        <h2 className='text-center font-semibold text-3xl my-7'>Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input hidden onChange={(e)=>setFile(e.target.files[0])} ref={fileRef} type='file' accept='image/*' />
      <img onClick={()=>fileRef.current.click()} className='h-24 w-24 object-cover cursor-pointer rounded-full ring-2 self-center' src={formData.avatar || currentUser.avatar} alt='avatar'/>
      <p className='text-sm self-center'>
        { 
          fileUploadError ? <span className='text-red-700'>Error Image Upload(Image must be less than 2mb)</span> : 
          (fileUploadPerc > 0 && fileUploadPerc < 100) ? <span className='text-slate-700'>{fileUploadPerc}%</span> : 
          (fileUploadPerc === 100) ? <span className='text-green-700'>Image Successfully Uploaded!</span> : ("")
        }
      </p>
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
