import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// import swiper styles
import "swiper/css/bundle";
import BicycleItem from '../components/BicycleItem';

export default function Home() {
  const [offerBicycles, setOfferBicycles] = useState([]);
  const [saleBicycles, setSaleBicycles] = useState([]);
  const [rentBicycles, setRentBicycles] = useState([]);
  console.log(offerBicycles);
  useEffect(() => {
    const fetchOfferBicycles = async () => {
      try {
        const res = await fetch('/api/bicycle/search?offer=true&limit=4');
        const data = await res.json();
        setOfferBicycles(data);
        fetchRentBicycles();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentBicycles = async () => {
      try {
        const res = await fetch('/api/bicycle/search?type=rent&limit=4');
        const data = await res.json();
        setRentBicycles(data);
        fetchSaleBicycles();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleBicycles = async () => {
      try {
        const res = await fetch('/api/bicycle/search?type=sale&limit=4');
        const data = await res.json();
        setSaleBicycles(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferBicycles();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Rent Your <span className="text-slate-500">Favourite</span>
          <br />
          bicycle with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Bicycle Rental Application is the only place that leases you your dream bicycle at cheap prices
          <br />
          We have a wide range of bicycles for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {offerBicycles &&
          offerBicycles.length > 0 &&
          offerBicycles.map((bicycle) => (
            <SwiperSlide key={bicycle._id}>
              <div
                style={{
                  background: `url(${bicycle.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* bicycle results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerBicycles && offerBicycles.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerBicycles.map((bicycle) => (
                <BicycleItem bicycle={bicycle} key={bicycle._id} />
              ))}
            </div>
          </div>
        )}
        {rentBicycles && rentBicycles.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentBicycles.map((bicycle) => (
                <BicycleItem bicycle={bicycle} key={bicycle._id} />
              ))}
            </div>
          </div>
        )}
        {saleBicycles && saleBicycles.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleBicycles.map((bicycle) => (
                <BicycleItem bicycle={bicycle} key={bicycle._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}