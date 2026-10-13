import React, { useState } from "react";
import swiggyData from "./swiggyData.json";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");

    // Cloudinary image URL
    const getImageUrl = (cloudinaryId) => {
        if (!cloudinaryId) return "";

        return `https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryId}`;
    };

    // Filter suggestions according to search
    const filteredData = swiggyData.data.suggestions.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for restaurants and food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-orange-500"
            />

            {/* Search Results */}
            <div className="mt-5 flex flex-col gap-3">
                {filteredData.map((item, index) => (
                    <div
                        key={item.cloudinaryId || item.text || index}
                        className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:bg-gray-50"
                    >
                        {/* Food Image */}
                        {item.cloudinaryId && (
                            <img
                                src={getImageUrl(item.cloudinaryId)}
                                alt={item.text || "Food"}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                        )}

                        {/* Food Name */}
                        <p className="text-gray-800 font-medium">
                            {item.text}
                        </p>
                    </div>
                ))}

                {/* No Results */}
                {filteredData.length === 0 && (
                    <p className="text-gray-500 text-center py-6">
                        No results found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Search;
