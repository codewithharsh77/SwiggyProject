import React, { useState } from 'react'
import RestaurantCards from './RestaurantCards'
import cross from "../assets/close.png"
import { setFilterValue } from '../utilis/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

function OnlineDelivery({ restaurants }) {

  const filterOptions = [
    {
      filterName : "Ratings 4.0+"
    },
    {
      filterName : "Rs. 150-Rs.300"
    },
    {
      filterName : "Rs. 300-Rs.500"
    },
    {
      filterName : "Offers"
    },
  ]

  const [activeBtn, setActiveBtn] = useState(null);
  const dispatch = useDispatch();
  function handleFilterBtn(filterName){
    // agar phir se same button par click ho jaye to null warna that particular filterOption
     const newFilter = activeBtn === filterName ? null : filterName;
    setActiveBtn(newFilter);
    dispatch(setFilterValue(newFilter));
  }

  return (
    <div>
      <h1 className='mt-4 text-2xl mb-4 font-bold'>Restaurants with online food delivery</h1>

      <div className='my-7 flex gap-3'>
      {
        filterOptions.map((data)=> (
           <button key={data.filterName} onClick={() => handleFilterBtn(data.filterName)} className={"filterBtn flex items-center gap-2 " + (activeBtn === data.filterName ? "active" : "")}>{data.filterName} <img className='w-3' src={cross} alt="cross" /></button>
        ))
      }
      </div>
      
      <div className="grid grid-cols-4 gap-10">
        {restaurants.map((restaurant) => (
          <RestaurantCards
            key={restaurant.id}
            restaurant={restaurant}
            id={restaurant.id}
          />
        ))}
      </div>
    </div>
  )
}


export default OnlineDelivery