import React, { createContext, useState, ReactNode } from "react";

// Define the Plant interface with additional properties
export interface Plant {
  id: number;
  roomId: number; // Added roomId to associate the plant with a room
  commonName: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  watering: string;
  lastWatered: number;
  sunlight: string;
  temperature: string;
  origin: string;
  family: string;
  growthHabit: string;
}

// Define a Room interface
export interface Room {
  id: number; // Each room should have a unique ID
  name: string;
}

// Define the shape of the context data
interface PlantContextType {
  plants: Plant[];
  rooms: Room[];
  currentRoomIndex: number;
  addPlant: (plant: Plant) => void;
  setCurrentRoomIndex: (index: number) => void;
  addRoom: (room: Room) => void;
}

// Create an initial value
const initialValue: PlantContextType = {
  plants: [],
  rooms: [
    { id: 1, name: "Living Room" },
    { id: 2, name: "Kid's Room" },
    { id: 3, name: "Bedroom" },
    // ... add more predefined rooms or an empty array if none
  ],
  currentRoomIndex: 0,
  addPlant: () => {},
  setCurrentRoomIndex: () => {},
  addRoom: () => {},
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
      roomId: 1,
      commonName: "Monstera",
      scientificName: "Monstera Deliciosa",
      description:
        "Dříve nutný itinerář úřadů, dnes královna pokojovek. Je velmi nenáročná na pěstování a při správné péči se vám odmění typicky vyříznutými okrasnými listy, které během několika let dosáhnou opravdu monstrózních rozměrů.",
      imageUrl:
        "https://www.pokojovky.co/cdn/shop/products/XxDsKnCY_1391x1854.jpg?v=1667897784",
      watering: "100 ml per day",
      lastWatered: 2,
      sunlight: "70% sunlight",
      temperature: "23",
      origin:
        "Native to the tropical rainforests of Central America, particularly in countries like Mexico, Panama, and Costa Rica.",
      family:
        "Belongs to the Araceae family, which consists of various flowering plants often characterized by their distinctive, large leaves.",
      growthHabit:
        "A climbing, evergreen perennial with an aerial root system that allows it to attach to trees or other supports in its natural habitat.",
    },
    {
      id: 2,
      roomId: 2,
      commonName: "Bird of paradise",
      scientificName: "Strelitzia nicolai",
      description:
        'Kus pralesa u vás doma! Stěží najdete exotičtější pokojovku, než právě "Bird of paradise" se svými lesklými, rozložitými listy. V pokojových podmínkách může vyrůst až tři metry. Navíc je skvělou volbou pro začátečníky a umí čistit vzduch.',
      imageUrl:
        "https://www.pokojovky.co/cdn/shop/products/ngqdQsp0_696x927.jpg?v=1670316319",
      watering: "100 ml per day",
      lastWatered: 7,
      sunlight: "85% sunlight",
      temperature: "18-25",
      origin:
        "Native to the tropical rainforests of Central America, particularly in countries like Mexico, Panama, and Costa Rica.",
      family:
        "Belongs to the Araceae family, which consists of various flowering plants often characterized by their distinctive, large leaves.",
      growthHabit:
        "A climbing, evergreen perennial with an aerial root system that allows it to attach to trees or other supports in its natural habitat.",
    },
  ]);
  const [rooms, setRooms] = useState<Room[]>(initialValue.rooms);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(
    initialValue.currentRoomIndex
  );

  const addPlant = (newPlant: Plant) => {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
  };

  const addRoom = (newRoom: Room) => {
    setRooms((currentRooms) => [...currentRooms, newRoom]);
  };

  // The context provider will now pass down the rooms, currentRoomIndex, and its setter function
  return (
    <PlantContext.Provider
      value={{
        plants,
        rooms,
        currentRoomIndex,
        setCurrentRoomIndex,
        addPlant,
        addRoom,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};
