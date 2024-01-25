import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getCurrentUserId,
  getRooms as fetchRooms,
  addRoom as createRoom,
  getPlantsInRoom as fetchPlantsInRoom,
  addPlantt as createPlant,
  PlantInfo,
} from "../firebase";

// Define the Room interface
export interface Room {
  id: string;
  name: string;
}

// Define the shape of the context data
interface PlantContextType {
  plants: PlantInfo[];
  rooms: Room[];
  currentRoomIndex: number;
  setPlants: React.Dispatch<React.SetStateAction<PlantInfo[]>>; // Add this line
  addPlant: (newPlant: PlantInfo, roomId: string) => void; // Update the type of addPlant
  setCurrentRoomIndex: (index: number) => void;
  addRoom: (room: Room) => void;
  updateRooms: React.Dispatch<React.SetStateAction<Room[]>>; // Add this line
}

// Create an initial value
const initialValue: PlantContextType = {
  plants: [], // This will be an array of PlantInfo objects
  rooms: [],
  currentRoomIndex: 0,
  setPlants: () => {}, // Add this line
  addPlant: () => {},
  setCurrentRoomIndex: () => {},
  addRoom: () => {},
  updateRooms: () => {}, // Add this line
};

// Create the context
export const PlantContext = createContext<PlantContextType>(initialValue);

// Define the type for the PlantProvider props
interface PlantProviderProps {
  children: ReactNode;
}

// Create the PlantProvider component
export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<PlantInfo[]>([]); // Using PlantInfo here
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      fetchRooms(userId)
        .then((fetchedRooms) => {
          setRooms(fetchedRooms);
          if (fetchedRooms.length > 0) {
            fetchPlantsInRoom(userId, fetchedRooms[currentRoomIndex].id).then(
              (fetchedPlants) => {
                setPlants(fetchedPlants);
              }
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    }
  }, [currentRoomIndex]);

  const addPlant = async (newPlant: PlantInfo, roomId: string) => {
    const userId = getCurrentUserId();
    if (userId) {
      await createPlant(userId, roomId, newPlant);
      // Refetch plants for the current room
      const updatedPlants = await fetchPlantsInRoom(userId, roomId);
      setPlants(updatedPlants);
    }
  };

  const addRoom = async (newRoom: Room) => {
    const userId = getCurrentUserId();
    if (userId) {
      await createRoom(userId, newRoom.name);
      // Refetch rooms or update state optimistically
      // fetchRooms(userId).then(updatedRooms => setRooms(updatedRooms));
      const updatedRooms = await fetchRooms(userId);
      setRooms(updatedRooms);
    }
  };

  return (
    <PlantContext.Provider
      value={{
        plants,
        rooms,
        currentRoomIndex,
        setPlants,
        setCurrentRoomIndex,
        addPlant,
        addRoom,
        updateRooms: setRooms, // Expose setRooms as updateRooms for clarity
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export default PlantContext;
