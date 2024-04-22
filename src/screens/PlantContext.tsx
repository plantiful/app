import React, { createContext, ReactNode, useEffect, useState } from "react";
import {
  addPlantt as createPlant,
  addRoom as createRoom,
  getPlantsInRoom as fetchPlantsInRoom,
  getRooms as fetchRooms,
  getCurrentUserId,
  PlantInfo,
} from "../firebase";

export interface Room {
  id: string;
  name: string;
}

interface PlantContextType {
  plants: PlantInfo[];
  rooms: Room[];
  currentRoomIndex: number;
  setPlants: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
  addPlant: (newPlant: PlantInfo, roomId: string) => void;
  setCurrentRoomIndex: (index: number) => void;
  addRoom: (room: Room) => void;
  updateRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const initialValue: PlantContextType = {
  plants: [],
  rooms: [],
  currentRoomIndex: 0,
  setPlants: () => {},
  addPlant: () => {},
  setCurrentRoomIndex: () => {},
  addRoom: () => {},
  updateRooms: () => {},
};

export const PlantContext = createContext<PlantContextType>(initialValue);

interface PlantProviderProps {
  children: ReactNode;
}

export const PlantProvider = ({ children }: PlantProviderProps) => {
  const [plants, setPlants] = useState<PlantInfo[]>([]);
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
      const updatedPlants = await fetchPlantsInRoom(userId, roomId);
      setPlants(updatedPlants);
    }
  };

  const addRoom = async (newRoom: Room) => {
    const userId = getCurrentUserId();
    if (userId) {
      await createRoom(userId, newRoom.name);
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
        updateRooms: setRooms,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export default PlantContext;
