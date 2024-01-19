import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Plant} from './PlantContext';

// Assuming this is the structure of your navigation parameter
interface PlantDetailScreenProps {
    route: {
        params: {
            plant: Plant; // Plant is the interface you defined earlier
        };
    };
}

export const PlantDetailScreen = ({ route }: PlantDetailScreenProps) => {
    const { plant } = route.params;

    return (
        <View style={styles.container}>
            <Text>{plant.name}</Text>
            {/* Display other plant details */}
        </View>
    );
};

// Add styles as needed
const styles = StyleSheet.create({
    container: {
        // Your styling
    },
});
