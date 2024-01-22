import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [400, 200], // Adjust the output range to control the speed of the parallax effect
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: plant.imageUrl }}
          style={[styles.image, { height: headerHeight }]}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{plant.name}</Text>
          <View style={styles.infoSection}>
            <View style={styles.iconContainer}>
              <Icon name="water" size={24} color="#000" />
              <Text style={styles.infoText}>{plant.watering}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="weather-sunny" size={24} color="#000" />
              <Text style={styles.infoText}>{plant.sunlight}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="thermometer" size={24} color="#000" />
              <Text style={styles.infoText}>{`${plant.temperature}°C`}</Text>
            </View>
          </View>
          <Text style={styles.header}>Origin</Text>
          <Text style={styles.text}>{plant.origin}</Text>
          <Text style={styles.header}>Plant Family</Text>
          <Text style={styles.text}>{plant.family}</Text>
          <Text style={styles.header}>Growth Habit</Text>
          <Text style={styles.text}>{plant.growthHabit}</Text>
          <Text style={styles.header}>Description</Text>
          <Text style={styles.text}>{plant.description}</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    // height is now dynamic and controlled by animation
  },

  detailsContainer: {
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#fff',
    marginTop: -20, // Adjust this value as needed to create the desired effect
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    borderBottomWidth: 1, // This adds the line below the text
    borderBottomColor: '#D3D3D3', // This sets the line color to grey
    paddingBottom: 8, // This adds some space between the text and the line
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Aligned to the left
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Soft background color for icons
    borderRadius: 20, // Rounded corners for icons
    padding: 8, // Padding inside the icon containers
    marginRight: 8, // Space between icon containers
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 4,
  },
  header: {
    fontSize: 22, // Larger font size for headers
    fontWeight: 'bold',
    color: '#000',
    marginTop: 24,
  },
  text: {
    fontSize: 18, // Larger font size for text
    color: '#000',
    marginBottom: 8, // Space after text
  },
});

export default PlantDetailScreen;