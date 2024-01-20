import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Plant } from "./PlantContext";

// Assuming this is the structure of your navigation parameter
interface PlantDetailScreenProps {
  route: {
    params: {
      plant: Plant; // Plant is the interface you defined earlier
    };
  };
}

const PlantDetailScreen = ({ route }: PlantDetailScreenProps) => {
  const { plant } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{plant.name}</Text>
      <Text>{plant.description}</Text>
    </SafeAreaView>
  );
};

// Add styles as needed
const styles = StyleSheet.create({
  container: {
    // Your styling
  },
});

export default PlantDetailScreen;
