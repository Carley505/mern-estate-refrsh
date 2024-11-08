import React from "react";

import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBicycle } from "react-icons/fa6";
import BicycleStars from "./BicycleStars";

export default function BicycleItem({ bicycle }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/bicycle/${bicycle._id}`}>
        <img
          src={
            bicycle.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="bicycle cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {bicycle.model}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {bicycle.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {bicycle.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold ">
            Kshs
            {bicycle.offer
              ? bicycle.discountPrice.toLocaleString("en-US")
              : bicycle.regularPrice.toLocaleString("en-US")}
            {bicycle.type === "rent" && " / Day"}
          </p>
          <div className="flex items-center">
            <label className="font-semibold text-sm">Condition: </label>
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
      </Link>
    </div>
  );
}
