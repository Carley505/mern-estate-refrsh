import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Contact from "../components/Contact";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// import swiper styles
import "swiper/css/bundle";

import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { FaBicycle } from "react-icons/fa6";
import { useSelector } from "react-redux";
import BicycleStars from "../components/BicycleStars";

export default function BicyclePage() {
  const [bicycle, setBicycle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  console.log(bicycle);

  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  useEffect(() => {
    const bicycleId = params.bicycleId;
    const url = `/api/bicycle/${bicycleId}`;
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
          setBicycle(data);
          setLoading(false);
          setError(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    };
    fetchListing();
  }, [params.bicycleId]);

  
  useEffect(() => {
    // Ensure the map container element exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer || !window.L || !window.L.mapquest) return;

    // Replace 'YOUR_API_KEY' with your actual MapQuest API key
    // window.L.mapquest.key = import.meta.env.MAPQUEST_API_KEY;
    window.L.mapquest.key = "XTjPEm1X6U5Tn9fU02evmMy2VXwjnhVV";

    // Create a map
    const map = window.L.mapquest.map('map', {
      center: [37.7749, -122.4194], // Set initial coordinates
      layers: window.L.mapquest.tileLayer('map'), // Set the tile layer
      zoom: 12,
    });

    // Add a marker
    window.L.marker([37.7749, -122.4194], {
      icon: window.L.mapquest.icons.marker(),
      draggable: false,
    }).addTo(map);
  }, []);

  return (
    <main>
      {loading && <p className="text-center mt-7 text-2xl">Loading....</p>}
      {error && (
        <p className="text-center mt-7 text-2xl">Something Went Wrong!</p>
      )}
      {bicycle && !loading && !error && (
        <>
          <Swiper
            //    import swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {bicycle.imageUrls.map((url) => {
              return (
                <SwiperSlide key={url}>
                  <div
                    className="h-[500px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: `cover`,
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 h-12 w-12 bg-slate-100 flex justify-center items-center rounded-full cursor-pointer border">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 text-slate-500 bg-slate-100 p-2 rounded-md">
              Link copied
            </p>
          )}
          {/* ================= INFRO  ================= */}
          <div className="max-w-4xl mx-auto space-y-4 p-4">
            <h2 className="font-semibold text-2xl">
              {bicycle.model} - Kshs{" "}
              {bicycle.offer
                ? bicycle.discountPrice.toLocaleString("en-US")
                : bicycle.regularPrice.toLocaleString("en-US")}
              {bicycle.type === "rent" && " / Day"}
            </h2>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-semibold text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                <span className="text-slate-600">{bicycle.address}</span>
              </p>
              <div className="flex gap-4">
                <p className="bg-red-700 text-white w-full max-w-[200px] py-1 rounded-md text-center">
                  {bicycle.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {bicycle.offer && (
                  <p className="bg-green-700 text-white w-full max-w-[200px] py-1 rounded-md text-center">
                    Kshs
                    {(
                      +bicycle.regularPrice - +bicycle.discountPrice
                    ).toLocaleString("en-US")}{" "}
                    OFF
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Description - </span>
                {bicycle.description}
              </p>
              <div className="flex items-center">
                <label className="font-semibold">Condition:</label>
                <BicycleStars condition={bicycle.condition} />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold">Group:</label>
                <span className="flex gap-1 text-sky-800">
                  <FaBicycle className="h-6 w-6" />
                  <span className="font-semibold">
                    {bicycle.group === "kid" ? "Kids" : "Adults"}
                  </span>
                </span>
              </div>
            </div>
            {currentUser && bicycle.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="w-full bg-slate-700 uppercase text-white rounded-md py-2 hover:opacity-95"
                type="button"
              >
                Contact renter
              </button>
            )}
            {contact && <Contact bicycle={bicycle} />}
            <div id="map" className="w-full h-[520px]"></div>
          </div>
        </>
      )}
    </main>
  );
}
