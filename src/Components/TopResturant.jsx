import React, { useContext,useState } from 'react';
import { LocationContext } from "../context/contextApi";
import leftArrow from "../assets/arrow.png"
import rightArrow from "../assets/right-arrow.png";
import burgerKing from "../assets/BurgerKing.avif";
import belgianWaffle from "../assets/BelgianWaffle.avif";
import baskinRobbin from "../assets/BaskinRobbin.avif";
import kalraSweet from "../assets/KalraSweetShop.avif";
import kfc from "../assets/Kfc.avif";
import Dhaba90s from "../assets/Dhaba90s.avif";
import punjabhiChaap from "../assets/PunjabhiChaap.avif";
import subway from "../assets/Subway.avif";
import cofee from "../assets/CafeCofeeDay.avif";
import RestaurantCards from './RestaurantCards';

function TopResturant({restaurants}) {
    const { location } = useContext(LocationContext);
    const [value, setValue] = useState(0);

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 20);
    }

    function handleNext() {
        value >= 140 ? "" : setValue((prev) => prev + 20);
    }

    return (
        <div className="mt-10 overflow-hidden">

            {/* Header Section */}
            <div className="flex justify-between items-center px-14">

                <h1 className="text-2xl font-bold">
                    Top restaurant chains in {location}
                </h1>

                <div className="flex gap-3">

                    <div
                        onClick={handlePrev}
                        className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
                    >
                        <img
                            className="w-4 h-4"
                            src={leftArrow}
                            alt="left arrow"
                        />
                    </div>

                    <div
                        onClick={handleNext}
                        className="bg-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-300"
                    >
                        <img
                            className="w-4 h-4"
                            src={rightArrow}
                            alt="right arrow"
                        />
                    </div>

                </div>
            </div>


            {/* Slider Container */}
            <div
                style={{
                    transform: `translateX(-${value}%)`
                }}
                className="flex transition-transform duration-500 ease-in-out gap-8 px-14 mt-6"
            >

                {restaurants.map((restaurant, index) => (

                    <RestaurantCards
                        key={restaurant.id}
                        restaurant={restaurant}
                        id={restaurant.id}
                    />

                ))}

            </div>


            <hr className="mt-10 border-gray-200" />

        </div>
    )
}

export default TopResturant;