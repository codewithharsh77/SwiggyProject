
import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import TopResturant from "./TopResturant";
import OnlineDelivery from "./OnlineDelivery";
import Shimmer from "./Shimmer";

import burgerKing from "../assets/BurgerKing.avif";
import belgianWaffle from "../assets/BelgianWaffle.avif";
import baskinRobbin from "../assets/BaskinRobbin.avif";
import kalraSweet from "../assets/KalraSweetShop.avif";
import kfc from "../assets/Kfc.avif";
import Dhaba90s from "../assets/Dhaba90s.avif";
import punjabhiChaap from "../assets/PunjabhiChaap.avif";
import subway from "../assets/Subway.avif";
import cofee from "../assets/CafeCofeeDay.avif";

import { useSelector } from "react-redux";

function Body() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const restaurants = [
    {
      id: 1,
      img: burgerKing,
      name: "Burger King",
      offer: "ITEMS AT ₹169",
      rating: "4.5",
      time: "25-30 mins",
      place: "shivalik nagar",
      price: 250
    },
    {
      id: 2,
      img: belgianWaffle,
      name: "BelgianWaffle",
      offer: "ITEMS AT ₹199",
      rating: "4.3",
      time: "15-20 mins",
      place: "ranipur more",
      price: 350
    },
    {
      id: 3,
      img: baskinRobbin,
      name: "BaskinRobbin",
      offer: "50% OFF UPTO ₹100",
      rating: "4.6",
      time: "20-25 mins",
      place: "har ki pauri",
      price: 300
    },
    {
      id: 4,
      img: kalraSweet,
      name: "KalraSweet",
      offer: "60% OFF UPTO ₹120",
      rating: "4.2",
      time: "10-15 mins",
      place: "jwalapur",
      price: 400
    },
    {
      id: 5,
      img: kfc,
      name: "Kfc",
      offer: "COMBO AT ₹140",
      rating: "4.4",
      time: "5-10 mins",
      place: "moti bazar",
      price: 450
    },
    {
      id: 6,
      img: Dhaba90s,
      name: "Dhaba90s",
      offer: "THALI AT ₹100",
      rating: "4.1",
      time: "40-45 mins",
      place: "shivalik nagar",
      price: 150
    },
    {
      id: 7,
      img: punjabhiChaap,
      name: "punjabhiChaap",
      offer: "30% OFF",
      rating: "4.3",
      time: "35-40 mins",
      place: "ranipur more",
      price: 500
    },
    {
      id: 8,
      img: subway,
      name: "Subway",
      offer: "STARTS FROM ₹120",
      rating: "4.5",
      time: "45-50 mins",
      place: "sidcul",
      price: 550
    },
    {
      id: 9,
      img: cofee,
      name: "Cafe Cofee Day",
      offer: "STARTS FROM ₹70",
      rating: "4.0",
      time: "30-35 mins",
      place: "arya nagar chowk",
      price: 100
    }
  ];

  const filterVal = useSelector(
    (state) => state.filterSlice.filterVal
  );

  const filteredData = restaurants.filter((items) => {
    if (!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+":
        return Number(items.rating) >= 4.0;

      case "Rs. 150-Rs.300":
        return items.price >= 150 && items.price < 300;

      case "Rs. 300-Rs.500":
        return items.price >= 300 && items.price <= 500;

      case "Offers":
        return items.offer !== "";

      default:
        return true;
    }
  });

  return (
    <div className="w-full">
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="w-[75%] mx-auto mt-3 overflow-hidden">
          <Menu />
          <TopResturant restaurants={restaurants} />
          <OnlineDelivery restaurants={filteredData} />
        </div>
      )}
    </div>
  );
}

export default Body;
