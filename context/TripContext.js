// TripContext.js
import React, { createContext, useState, useContext } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [availableTrips, setAvailableTrips] = useState([
    // Example trip data
    { id: 1, currentLocation: "Location A", selectedLocation: "Location B", price: 20, vehicleType: "Car", status: "Accepted" },
    // Add more trips as needed
  ]);

  const [completedTrips, setCompletedTrips] = useState([]);

  const completeTrip = (tripId) => {
    // Find the trip by ID
    const tripToComplete = availableTrips.find(trip => trip.id === tripId);
    
    if (tripToComplete) {
      // Remove from available trips
      setAvailableTrips(availableTrips.filter(trip => trip.id !== tripId));
      // Add to completed trips
      setCompletedTrips([...completedTrips, { ...tripToComplete, status: "Completed" }]);
    }
  };

  return (
    <TripContext.Provider value={{ availableTrips, completeTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  return useContext(TripContext);
};
