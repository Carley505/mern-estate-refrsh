import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {

  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  console.log(isUploadingImage)

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
  console.log(formData)

  const storeImage = async(file) =>{
    setIsUploadingImage(true)
    return new Promise((resolve, reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, 'images/' + fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed",
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
          console.log('Upload file ' + progress + '% done')
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

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h2 className="font-semibold text-3xl text-center my-7">
        Create Listing
      </h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <input
            className="p-2 rounded-md focus:outline-none border"
            type="text"
            id="name"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            className="p-2 rounded-md min-h-22 focus:outline-none border"
            placeholder="Description"
            id="description"
            required
          ></textarea>
          <input
            className="p-2 rounded-md focus:outline-none border"
            type="text"
            id="address"
            placeholder="Address"
            required
          />
          <div className="flex flex-wrap justify-self-start gap-4">
            <label className="flex items-center space-x-2" htmlFor="sell">
              <input className="h-6 w-6" type="checkbox" id="sell" />
              <span>Sell</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="rent">
              <input className="h-6 w-6" type="checkbox" id="rent" />
              <span>Rent</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="parking">
              <input className="h-6 w-6" type="checkbox" id="parking" />
              <span>Parking Spot</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="furnished">
              <input className="h-6 w-6" type="checkbox" id="furnished" />
              <span>Furnished</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="offer">
              <input className="h-6 w-6" type="checkbox" id="offer" />
              <span>Offer</span>
            </label>
          </div>
          <div className="flex flex-row gap-4 flex-wrap justify-self-start">
            <label className="flex items-center space-x-2" htmlFor="bedRooms">
              <input
                className="h-10 w-12 pl-2 border"
                type="number"
                defaultValue="1"
                id="bedRooms"
              />
              <span>Beds</span>
            </label>
            <label className="flex items-center space-x-2" htmlFor="bathRooms">
              <input
                className="h-10 w-12 pl-2"
                type="number"
                defaultValue="1"
                id="bathRooms"
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
                defaultValue="0"
                id="regularPrice"
              />
              <p className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($ / Month)</span>
              </p>
            </label>
            <label
              className="flex items-center space-x-2"
              htmlFor="discountPrice"
            >
              <input
                className="h-10 w-16 pl-2"
                type="number"
                defaultValue="0"
                id="discountPrice"
              />
              <p className="flex flex-col items-center">
                <span>Discount Price</span>
                <span className="text-xs">($ / Month)</span>
              </p>
            </label>
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
          <button className="bg-slate-700 rounded-md uppercase text-white p-3 w-full hover:opacity-95 disabled:opacity-80">
            create listing
          </button>
        </div>
      </form>
      <div></div>
    </main>
  );
}
