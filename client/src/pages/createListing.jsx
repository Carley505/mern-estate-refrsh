
import React from 'react'

export default function CreateListing() {
  return (
    <div className='max-w-4xl mx-auto '>
        <h2 className='font-bold text-3xl text-center my-7'>Create Listing</h2>
        <form className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-4 p-4'>
            <input className='p-2 rounded-md focus:outline-none border' type='text' id='name' placeholder='Name'/>
            <textarea className='p-2 rounded-md min-h-22 focus:outline-none border' placeholder='Description'></textarea>
            <input className='p-2 rounded-md focus:outline-none border' type='text' id='address' placeholder='Address'/>
            <div className='flex flex-wrap justify-self-start gap-4'>
              <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-6 w-6' type='checkbox' id='sell'/>
                <span>Sell</span>
              </label>
              <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-6 w-6' type='checkbox' id='sell'/>
                <span>Rent</span>
              </label>
              <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-6 w-6' type='checkbox' id='sell'/>
                <span>Parking Spot</span>
              </label>
              <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-6 w-6' type='checkbox' id='sell'/>
                <span>Furnished</span>
              </label>
              <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-6 w-6' type='checkbox' id='sell'/>
                <span>Offer</span>
              </label>
            </div>
            <div className='flex flex-row space-x-4'>
            <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-10 w-12 pl-2 border' type='number' defaultValue="1" id='beds'/>
                <span>Beds</span>
            </label>
            <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-10 w-12 pl-2' type='number' defaultValue="1" id='baths'/>
                <span>Baths</span>
            </label>
            </div>
            <div>
            <label className='flex items-center space-x-2' htmlFor='sell'>
                <input className='h-10 w-16 pl-2' type='number' defaultValue="0" id='baths'/>
                <p className='flex flex-col items-center'>
                    <span>Regular Price</span>
                    <span className='text-sm'>($ / Month)</span>
                </p>
            </label>
            </div>
            </div>
            <div className='space-y-4'>
                <p><span className='font-bold'>Images: </span>The first image will be the cover (max 6)</p>
                <div className='flex justify-between'>
                    <input className='ring-1 p-2 rounded-md' type='file'/>
                    <button className='ring-1 ring-sky-700 p-3 uppercase font-semibold rounded-md text-green-700' type='button'>Upload</button>
                </div>
                <button className='bg-slate-700 rounded-md uppercase text-white p-3 w-full'>create listing</button>
            </div>
        </form>
        <div></div>
    </div>
  )
}
