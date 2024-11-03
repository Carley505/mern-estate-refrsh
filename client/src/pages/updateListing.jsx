

import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateListing() {

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    parking: false,
    furnished: false,
    bathRooms: 1,
    bedRooms: 1,
    offer: false,
    regularPrice: 50,
    discountPrice: 0,
    useRef: ''
  });

  const [imageUploadError, setImageUploadError] = useState(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const {currentUser } = useSelector((state)=>state.user)

  const navigate = useNavigate()
  const params = useParams()

  const [files, setFiles] = useState([])

  const handleImageSubmit = (e)=>{

    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      const promises = [];

      setImageUploadError(null)
      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
        setImageUploadError(null)
      })
    }else{
      setImageUploadError("total images should be 6 images.")
    }
  }
  const handleImageDelete = (index) =>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i)=> i !== index )
    })
  }

  const storeImage = async(file) =>{
    setIsUploadingImage(true)
    setError(null)
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'images/' + fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed",
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        },
        (error)=>{
          setImageUploadError("Image should be less than 2mb max per image")
          setIsUploadingImage(false)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            resolve(downloadUrl);
          })
          setIsUploadingImage(false)
        }
      )
    })
  }

  const handleChange = (e) =>{
    if(e.target.id === "sell" || e.target.id === "rent"){
      setFormData({
        ...formData,
        type: e.target.id
      })
    }
    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      })
    }
    if(e.target.type === "text" || e.target.type === "number" || e.target.type === "textarea"){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(formData.imageUrls.length < 1) return setError("You Must upload atleast one image!")
    if(formData.discountPrice > formData.regularPrice) return setError("Discount price Must be lower than Regular price.")
    const url = `/api/listing/update/${params.listingId}`;
    setLoading(true)
    setError(null)
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      if(data.success === false){
        setError(data.message)
        setLoading(false)
        return
      }else{
        setLoading(false)
        setError(null)
        navigate(`/listing/${data._id}`)
      }
    }).catch((error)=>{
      setError(error.message)
      setLoading(false)
    })
  }

  useEffect(()=>{
    const listingId = params.listingId
    const url = `/api/listing/getListing/${listingId}`
    const fetchListing = async()=>{
      await fetch(url).then((response)=>{
        return response.json()
      }).then((data)=>{
        if(data.success === false){
          console.log(data.message)
        }else{
          setFormData(data)
        }
      }).catch((error)=>{
        console.log(error.message)
      })
    }
    fetchListing()
  }, [])

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h2 className="font-semibold text-3xl text-center my-7">
        Update Listing
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <input
            className="p-2 rounded-md focus:outline-none border"
            type="text"
            id="name"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            className="p-2 rounded-md min-h-22 focus:outline-none border"
            placeholder="Description"
            type="textarea"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            className="p-2 rounded-md focus:outline-none border"
            type="text"
            id="address"
            placeholder="Address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap justify-self-start gap-4">
            <label className="flex items-center space-x-2" htmlFor="sell">
              <input className="h-6 w-6" type="checkbox" id="sell" onChange={handleChange} checked={formData.type === "sell"} />
              <span>Sell</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="rent">
              <input className="h-6 w-6" type="checkbox" id="rent" onChange={handleChange} checked={formData.type === "rent"} />
              <span>Rent</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="parking">
              <input className="h-6 w-6" type="checkbox" id="parking" onChange={handleChange} checked={formData.parking} />
              <span>Parking Spot</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="furnished">
              <input className="h-6 w-6" type="checkbox" id="furnished" onChange={handleChange} checked={formData.furnished} />
              <span>Furnished</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="offer">
              <input className="h-6 w-6" type="checkbox" id="offer" onChange={handleChange} checked={formData.offer} />
              <span>Offer</span>
            </label>
          </div>
          <div className="flex flex-row gap-4 flex-wrap justify-self-start">
            <label className="flex items-center space-x-2" htmlFor="bedRooms">
              <input
                className="h-10 w-12 pl-2 border"
                type="number"
                id="bedRooms"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bedRooms}
              />
              <span>Beds</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="bathRooms">
              <input
                className="h-10 w-12 pl-2"
                type="number"
                id="bathRooms"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bathRooms}
              />
              <span>Baths</span>
            </label>
            <label
              className="flex items-center space-x-2"
              htmlFor="regularPrice"
            >
              <input
                className="h-10 w-16 pl-2"
                type="number"
                id="regularPrice"
                min={20}
                max={1000000}
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p className="flex flex-col items-center">
                <span>Regular Price</span>
                <span hidden={formData.type === "sell"} className="text-xs">($ / Month)</span>
              </p>
            </label>
           { formData.offer && (
            <label
              className="flex items-center space-x-2"
              htmlFor="discountPrice"
            >
              <input
                className="h-10 w-16 pl-2"
                type="number"
                id="discountPrice"
                min={0}
                max={1000000}
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <p className="flex flex-col items-center">
                <span>Discount Price</span>
                <span hidden={formData.type === "sell"} className="text-xs">($ / Month)</span>
              </p>
            </label>
           ) }
          </div>
        </div>
        <div className="space-y-4">
          <p>
            <span className="font-semibold">Images: </span>
            <span className="text-slate-600">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex flex-col gap-4 justify-between md:flex-row">
            <input onChange={(e)=>setFiles(e.target.files)} className="ring-1 w-full p-2 rounded-md" type="file" id="images" accept="image/*" multiple />
            <button
            disabled={isUploadingImage}
            onClick={handleImageSubmit}
              className="ring-1 ring-sky-700 p-3 uppercase font-semibold rounded-md text-green-700 hover:shadow-lg disabled:opacity-70"
              type="button"
            >
              { isUploadingImage ? "Uploading..." : "Upload" }
            </button>
          </div>
          { imageUploadError && <li className="text-red-700 text-xs ml-3">{imageUploadError}</li> }
          { 
            (formData.imageUrls.length > 0) && formData.imageUrls.map((url, index)=>{
              return(<div className="flex justify-between border items-center p-2" key={url}>
                <img className="h-20 w-20 object-contain rounded-lg" src={url} alt="image"/>
                <button type="button" onClick={()=>handleImageDelete(index)} className="uppercase text-red-700 font-semibold hover:opacity-80">Delete</button>
              </div>)
            }) 
           }
          <button disabled={loading || isUploadingImage} className="bg-slate-700 rounded-md uppercase text-white p-3 w-full hover:opacity-95 disabled:opacity-80">
            { loading ? "Updating...." : "Update listing" }
          </button>
          { error && <p className="text-red-700 text-sm">{error}</p> }
        </div>
      </form>
      <div></div>
    </main>
  );
}
