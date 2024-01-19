import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context data
interface PlantContextType {
    plants: Plant[];
    addPlant: (plant: Plant) => void;
}

// Define the Plant interface
export interface Plant {
    // Define the properties of a Plant object
    name: string;
    description: string;
}

// Create an initial value
const initialValue: PlantContextType = {
    plants: [],
    addPlant: () => {}
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
        { name: "Test Plant", description: "Test Descr" }
    ]);

    const addPlant = (plant: Plant) => {
        setPlants(currentPlants => {
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
