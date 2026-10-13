import React, { useState } from 'react'
import pizza from "../assets/Pizza.png";
import burger from "../assets/Burger.png";
import cake from "../assets/Cake.png";
import dessert from "../assets/Desserts.png";
import momo from "../assets/Momo.png";
import pasta from "../assets/Pasta.png";
import chinese from "../assets/Chinese.png";
import iceCream from "../assets/Ice Cream.png";
import northIndian from "../assets/North Indian.png";
import paratha from "../assets/Paratha.png";
import leftArrow from "../assets/arrow.png"
import rightArrow from "../assets/right-arrow.png";
function Menu() {
    const [value,setValue] = useState(0);
    
        function handlePrev(){
          value<=0 ? "" : setValue((prev) => prev-25)
        }
    
        function handleNext(){
          value>=50 ? "" : setValue((prev) => prev+25)
        }
  return (
    <div>
       <div className="flex justify-between mt-5 pr-25">
                   <h1 className="pl-20 text-2xl font-bold">what's on your mind?</h1>
                   <div className="flex mt-2 gap-3">
                       <div onClick={handlePrev} className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                       <img className='w-4 h-4' src={leftArrow} alt="" />
                       </div>
                       <div onClick={handleNext} className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                       <img className='w-4 h-4' src={rightArrow} alt="" />
                       </div>
                   </div>
               </div>
               <div style={{translate: `-${value}%`}} className={`flex *:w-40 *:shrink-0 pl-10 duration-1000`}>
               <div>
                   <img src={pizza} alt="" />
               </div>
               <div>
                   <img src={burger} alt=""/>
               </div>
               <div>
                   <img src={cake} alt="" />
               </div>
               <div>
                   <img src={dessert} alt="" />
               </div>
               <div>
                   <img src={momo} alt="" />
               </div>
               <div>
                   <img src={pasta} alt="" />
               </div>
               <div>
                   <img src={chinese} alt="" />
               </div>
               <div>
                   <img src={iceCream} alt="" />
               </div>
               <div>
                   <img src={northIndian} alt="" />
               </div>
               <div>
                   <img src={paratha} alt="" />
               </div>
               </div> 
               <hr />
    </div>
  )
}

export default Menu