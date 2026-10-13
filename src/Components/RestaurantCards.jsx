import React from 'react'
import star from "../assets/star.png";
import { Link } from 'react-router-dom';

function RestaurantCards({ restaurant, id }) {
    return (
        <Link to={`/restaurantMenu/${id}`}>
        <div className="shrink-0">

            {/* Image Card */}
            <div className="w-[273px] h-[182px] relative rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-[0.98] transition-all">

                {/* Dark bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>

                {/* Offer */}
                <h1 className="absolute bottom-0 text-white font-bold z-20 text-2xl ml-2 mb-1">
                    {restaurant.offer}
                </h1>

                {/* Restaurant Image */}
                <img
                    className="w-full h-full object-cover"
                    src={restaurant.img}
                    alt={restaurant.name}
                />

            </div>


            {/* Restaurant Details */}
            <div className="mt-3">

                {/* Name */}
                <h2 className="font-semibold">
                    {restaurant.name}
                </h2>

                {/* Rating + Time */}
                <p className="flex items-center gap-2">

                    <img
                        className="w-4 h-4"
                        src={star}
                        alt="star"
                    />

                    <span>{restaurant.rating}</span>

                    <span>{restaurant.time}</span>

                </p>

                {/* Place */}
                <p>{restaurant.place}</p>

            </div>

        </div>
        </Link>
    )
}

export default RestaurantCards;