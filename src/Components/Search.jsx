import React, { useState } from 'react'
import swiggyData from './swiggyData.json' 

function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeBtn, setActiveBtn] = useState("Dishes")

  const filterOptions = [
    { filterName: "Restaurant" },
    { filterName: "Dishes" }
  ]

  function handlefilterBtn(filterName) {
    setActiveBtn(filterName)
  }

  const suggestions = swiggyData?.data?.suggestions || []

  const filteredData = searchQuery.trim() === "" ? [] : suggestions.filter(item => {
    const matchesType = activeBtn === "Dishes" ? item.type === "DISH" : item.type === "RESTAURANT";
    const matchesQuery = item.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  // ✨ Yeh raha helper function jocloudinaryId ko sahi URL mein convert karega
  const getImageUrl = (cloudinaryId) => {
    if (!cloudinaryId) return 'https://via.placeholder.com/150';
    
    // Agar id mein pehle se "RX_THUMBNAIL" ya http hai, toh uske hisaab se URL lo
    if (cloudinaryId.startsWith("http")) {
      return cloudinaryId;
    } else if (cloudinaryId.startsWith("RX_THUMBNAIL")) {
      return `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryId}`;
    } else {
      return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryId}`;
    }
  };

  return (
    <div className='w-full md:w-[800px] mx-auto p-4'>

      {/* Search Input */}
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className='border-2 px-4 py-3 rounded-md focus:outline-none w-full shadow-sm'
        type="text"
        placeholder='Search for restaurant and food'
      />

      {/* Filter Buttons */}
      <div className='flex gap-3 mt-4'>
        {filterOptions.map((filter) => (
          <button
            key={filter.filterName}
            onClick={() => handlefilterBtn(filter.filterName)}
            className={`px-5 py-2 rounded-lg border-2 ${
              activeBtn === filter.filterName
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {filter.filterName}
          </button>
        ))}
      </div>

      {/* Suggestions Results */}
      <div className='mt-5'>
        {searchQuery.trim() !== "" && filteredData.length > 0 ? (
          filteredData.map((item, index) => {
            const imageUrl = (cloudinaryId) => {
              if(!cloudinaryId) return 'https://via.placeholder.com/150';
              
              //agar pehle se http hai
              if(cloudinaryId.startsWith("http")){
                return cloudinaryId;
              }
              //base url with transformation
              return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/${cloudinaryId}`;
            }

            return (
              <div key={index} className='flex items-center gap-4 p-3 border-b hover:bg-gray-50 cursor-pointer'>
                <img 
                  src={imageUrl} 
                  alt={item.text} 
                  className='w-14 h-14 object-cover rounded-md shadow-sm'
                />
                <div>
                  <h4 className='font-semibold text-gray-800'>{item.text}</h4>
                  <span className='text-xs text-gray-500 uppercase'>{item.subCategory || item.type}</span>
                </div>
              </div>
            );
          })
        ) : (
          searchQuery.trim() !== "" && <p className='text-gray-500 mt-4 text-center'>No results found</p>
        )}
      </div>

    </div>
  )
}

export default Search;