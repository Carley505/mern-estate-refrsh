import { MdOutlineStarHalf } from "react-icons/md";

import React from 'react'

export default function BicycleStars({condition}) {
  
    // map conditions to the number of stars
    const starCountMap = {
        poor: 1,
        fair: 2,
        good: 3,
        "very good": 4,
        excellent: 5,
    };
    const colorClasses = [
        "text-sky-500",
        "text-sky-600",
        "text-sky-700",
        "text-sky-800",
        "text-sky-900",
    ];

    // Determine the number of stars based on the condition prop
    const starCount = starCountMap[condition] || 3;

    // render stars
    const renderStars = () =>{
        return(
            <div className="flex flex-nowrap">
                {
                    Array.from({ length: starCount }).map((_, index)=>(
                        <MdOutlineStarHalf key={index} className={`${colorClasses[index]} h-6 w-6`} />
                    ))
                }
            </div>
        )
    }


  return (
    <div>
      {renderStars()}
    </div>
  )
}
