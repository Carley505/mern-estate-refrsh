import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contact from "../components/Contact";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

// import swiper styles
import "swiper/css/bundle"

import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa"
import { useSelector } from "react-redux";

export default function ListingPage() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state)=>state.user)

  const params = useParams();
  useEffect(() => {
    const listingId = params.listingId;
    const url = `/api/listing/getListing/${listingId}`;
    const fetchListing = async () => {
      setLoading(true);
      setError(false);
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success === false) {
            setLoading(false);
            setError(true);
            return;
          }
          setListing(data);
          setLoading(false);
          setError(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    };
    fetchListing();
  }, [params.listingId]);

  console.log(loading)
  return (
    <main>
      {loading && <p className="text-center mt-7 text-2xl">Loading....</p>}
      {error && (
        <p className="text-center mt-7 text-2xl">Something Went Wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper 
        //    import swiper modules
           modules={[Navigation, Pagination, Scrollbar, A11y]}
           spaceBetween={50}
           slidesPerView={1}
           navigation
           pagination={{clickable: true}}
           scrollbar={{draggable: true}}
           onSlideChange={()=>console.log('slide change')}
           onSwiper={(swiper)=>console.log(swiper)}
          >
            { listing.imageUrls.map((url)=>{
                return (
                    <SwiperSlide key={url}>
                        <div 
                        className="h-[500px]"
                        style={{ background: `url(${url}) center no-repeat`, backgroundSize: `cover` }}
                        ></div>
                    </SwiperSlide>
                )
            }) }
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 h-12 w-12 bg-slate-100 flex justify-center items-center rounded-full cursor-pointer border">
            <FaShare
             className="text-slate-500"
             onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setCopied(true)
                setTimeout(()=>{
                    setCopied(false)
                }, 2000)
             }}
             />
          </div>
          { copied && (
            <p className="fixed top-[23%] right-[5%] z-10 text-slate-500 bg-slate-100 p-2 rounded-md">Link copied</p>
          ) }
          <div className="max-w-4xl mx-auto space-y-4 p-4">
            <h2 className="font-semibold text-2xl">
              {listing.name} - ${' '}
              {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === "rent" && " /month"}
            </h2>
           <div className="space-y-1">
           <p className="flex items-center gap-2 font-semibold text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                <span className="text-slate-600">
                  {listing.address}
                </span>
              </p>
              <div className="flex gap-4">
                <p className="bg-red-700 text-white w-full max-w-[200px] py-1 rounded-md text-center">
                    { listing.type === "rent" ? "For Rent" : "For Sale" }
                </p>
                {
                    listing.offer && <p className="bg-green-700 text-white w-full max-w-[200px] py-1 rounded-md text-center">
                    ${ (+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US') } OFF
                </p>
                }
              </div>
           </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Description - </span>
                {listing.description}
              </p>
              <div className="text-green-900 font-semibold text-sm flex justify-self-start gap-4 flex-wrap">
                <div className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg"/>
                  <p>
                    {listing.bedRooms}
                    {listing.bedRooms !== 1 ? " Beds" : " Bed"}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg"/>
                  <p>
                    {listing.bathRooms}
                    {listing.bathRooms !== 1 ? " Baths" : " Bath"}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg"/>
                  <p>
                    {listing.parking ? " Parking" : " No Parking"}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg"/>
                  <p>
                    {listing.furnished
                      ? " Furnished"
                      : " Unfurnished"}
                  </p>
                </div>
              </div>
              { currentUser && listing.userRef !== currentUser._id && contact && (
                <button
                 onClick={()=>setContact(true)}
                 className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                    Contact Landload
                </button>
              ) }
              { contact && <Contact listing={listing} /> }
            </div>
          </div>
        </>
      )}
    </main>
  );
}
