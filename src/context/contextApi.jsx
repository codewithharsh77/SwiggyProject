
import { createContext, useState } from "react";

export const Visibility = createContext(false);

export const LocationContext = createContext(null);

export const cartContext = createContext(null);


// Location Provider

export function LocationProvider({ children }) {

    const [location, setLocation] = useState("Haridwar");

    return (
        <LocationContext.Provider value={{ location, setLocation }}>
            {children}
        </LocationContext.Provider>
    );
}
