import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

// import swiper styles
import "swiper/css/bundle"

export default function ListingPage() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(listing)

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
  }, []);

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
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="font-semibold text-2xl">
              {listing && listing.name} -
              <span> $ {listing && listing.regularPrice}</span>
            </h2>
            <div>
              <p>
                <span className="text-slate-500 font-semibold text-sm">
                  {listing && listing.address}
                </span>
              </p>
              <button
                className="bg-red-700 text-white py-2 px-4 rounded-lg"
                type="button"
              >
                {listing && listing.type}
              </button>
            </div>
            <div>
              <p>
                <span className="font-semibold">Description - </span>
                {listing && listing.description}
              </p>
              <div className="flex justify-self-start gap-4 flex-wrap">
                <div>
                  <p>
                    {listing && listing.bedRooms}
                    {listing && listing.bedRooms !== 1 ? " Beds" : " Bed"}
                  </p>
                </div>
                <div>
                  <p>
                    {listing && listing.bathRooms}
                    {listing && listing.bathRooms !== 1 ? " Baths" : " Bath"}
                  </p>
                </div>
                <div>
                  <p>
                    {listing && listing.parking ? " Parking" : " No Parking"}
                  </p>
                </div>
                <div>
                  <p>
                    {listing && listing.furnished
                      ? " Furnished"
                      : " Not Furnished"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
