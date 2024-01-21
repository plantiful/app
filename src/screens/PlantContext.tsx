import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface PlantContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
}

// Define the Plant interface with additional properties
export interface Plant {
  id: number;
  name: string;
  description: string;
  imageUrl: string; // URL to the plant's image
  watering: string; // Watering information, e.g., "100 ml per day"
  sunlight: string; // Sunlight requirement, e.g., "70% sunlight"
  temperature: string; // Optimal temperature, e.g., "23°C"
  origin: string; // Origin of the plant, e.g., "Central America"
  family: string; // Family of the plant, e.g., "Araceae"
  growthHabit: string; // Growth habit, e.g., "Climbing evergreen"
}
// Create an initial value
const initialValue: PlantContextType = {
  plants: [],
  addPlant: () => {},
};

// Create the context
export const PlantContext = createContext<PlantContextType>(initialValue);

// Define the type for the PlantProvider props
interface PlantProviderProps {
  children: ReactNode;
}

// Create the PlantProvider component
export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<Plant[]>([
    // Add a default plant with all the new properties
    {
      id: 1,
      name: "Monstera Deliciosa",
      description: "A description for Monstera Deliciosa...",
      imageUrl: "https://www.pokojovky.co/cdn/shop/products/XxDsKnCY_1391x1854.jpg?v=1667897784",
      watering: "100 ml per day",
      sunlight: "70% sunlight",
      temperature: "23",
      origin: "Central America",
      family: "Araceae",
      growthHabit: "Climbing evergreen",
    },
  ]);

  const addPlant = (plant: Plant) => {
    setPlants((currentPlants) => {
      const updatedPlants = [...currentPlants, plant];
      console.log("Updated plants in context:", updatedPlants);
      return updatedPlants;
    });
  };

  return (
    <PlantContext.Provider value={{ plants, addPlant }}>
      {children}
    </PlantContext.Provider>
  );
};
