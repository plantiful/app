import React, { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface PlantContextType {
  plants: Plant[];
  addPlant: (plant: Plant) => void;
}

// Define the Plant interface with additional properties
export interface Plant {
  id: number;
  commonName: string;
  scientificName: string;
  description: string;
  imageUrl: string; // URL to the plant's image
  watering: string; // Watering information, e.g., "100 ml per day"
  lastWatered: number; // Timestamp of the last watering
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
      commonName: "Monstera",
      scientificName: "Monstera Deliciosa",
      description: "Dříve nutný itinerář úřadů, dnes královna pokojovek. Je velmi nenáročná na pěstování a při správné péči se vám odmění typicky vyříznutými okrasnými listy, které během několika let dosáhnou opravdu monstrózních rozměrů.",
      imageUrl: "https://www.pokojovky.co/cdn/shop/products/XxDsKnCY_1391x1854.jpg?v=1667897784",
      watering: "100 ml per day",
      lastWatered : 3,
      sunlight: "70% sunlight",
      temperature: "23",
      origin: "Native to the tropical rainforests of Central America, particularly in countries like Mexico, Panama, and Costa Rica.",
      family: "Belongs to the Araceae family, which consists of various flowering plants often characterized by their distinctive, large leaves.",
      growthHabit: "A climbing, evergreen perennial with an aerial root system that allows it to attach to trees or other supports in its natural habitat.",
    },
    {
      id: 2,
      commonName: "Bird of paradise",
      scientificName: "Strelitzia nicolai",
      description: "Kus pralesa u vás doma! Stěží najdete exotičtější pokojovku, než právě \"Bird of paradise\" se svými lesklými, rozložitými listy. V pokojových podmínkách může vyrůst až tři metry. Navíc je skvělou volbou pro začátečníky a umí čistit vzduch.",
      imageUrl: "https://www.pokojovky.co/cdn/shop/products/ngqdQsp0_696x927.jpg?v=1670316319",
      watering: "100 ml per day",
      lastWatered : 1,
      sunlight: "85% sunlight",
      temperature: "18-25",
      origin: "Native to the tropical rainforests of Central America, particularly in countries like Mexico, Panama, and Costa Rica.",
      family: "Belongs to the Araceae family, which consists of various flowering plants often characterized by their distinctive, large leaves.",
      growthHabit: "A climbing, evergreen perennial with an aerial root system that allows it to attach to trees or other supports in its natural habitat.",
    }
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
