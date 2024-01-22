import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BlurView } from '@react-native-community/blur';

import { Plant } from './PlantContext'; // Import the Plant type

interface PlantDetailScreenProps {
  route: {
    params: {
      plant: Plant;
    };
  };
}

const PlantDetailScreen = ({ route }: PlantDetailScreenProps) => {
  const { plant } = route.params;
  const [blurRadius, setBlurRadius] = useState(0);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newBlurRadius = Math.min(10, scrollY / 50);
    setBlurRadius(newBlurRadius);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.spacer} />
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
      </ScrollView>
      <Image 
        source={{ uri: plant.imageUrl }} 
        style={styles.image} 
      />
      <Animated.View 
        style={[styles.blurView, { opacity: blurRadius / 10 }]}
      >
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={blurRadius}
        />
      </Animated.View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    width: '100%',
  },
  spacer: {
    height: 400,
  },
  detailsContainer: {
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#fff',
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
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    paddingBottom: 8,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 24,
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginBottom: 8,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default PlantDetailScreen;
