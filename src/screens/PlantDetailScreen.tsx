import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure to install this package

import { Plant } from "./PlantContext";

interface PlantDetailScreenProps {
  route: {
    params: {
      plant: Plant;
    };
  };
}

const PlantDetailScreen = ({ route }: PlantDetailScreenProps) => {
  const { plant } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: plant.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{plant.name}</Text>
          <View style={styles.infoSection}>
            <Icon name="water" size={24} color="#000" />
            <Text style={styles.infoText}>{plant.watering}</Text>
            <Icon name="weather-sunny" size={24} color="#000" />
            <Text style={styles.infoText}>{plant.sunlight}</Text>
            <Icon name="thermometer" size={24} color="#000" />
            <Text style={styles.infoText}>{`${plant.temperature}°C`}</Text>
          </View>
          <Text style={styles.header}>Origin</Text>
          <Text style={styles.text}>{plant.origin}</Text>
          <Text style={styles.header}>Plant Family</Text>
          <Text style={styles.text}>{plant.family}</Text>
          <Text style={styles.header}>Growth Habit</Text>
          <Text style={styles.text}>{plant.growthHabit}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },
  detailsContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default PlantDetailScreen;
