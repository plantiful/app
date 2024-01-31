import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { PlantInfo } from "../firebase";

interface PlantDetailScreenProps {
  route: {
    params: {
      plant: PlantInfo;
    };
  };
  navigation: any;
}

const PlantDetailScreen: React.FC<PlantDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { plant } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const goBack = () => {
    navigation.goBack();
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [450, 200],
    extrapolate: "clamp",
  });

  const GreenButton = ({ iconName, label, onPress}) => {
    return (
      <TouchableOpacity style={styles.greenButton} onPress={onPress}>
        <Icon name={iconName} size={20} color="#205950" opacity={100} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        overScrollMode="always"
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
      >
        <Animated.Image
          source={{ uri: plant.photo }}
          style={[styles.image, { height: headerHeight }]}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.line}></View>
          <Text style={styles.name}>{plant.commonName}</Text>
          <View style={styles.buttonContainer}>
            <GreenButton iconName="heart-outline" label="Like" onPress={() => {}} />
            <GreenButton iconName="cart-outline" label="Cart" onPress={() => {}} />
            <GreenButton iconName="plus" label="More" onPress={() => {}} />
          </View>
          <Text style={styles.scientificName}>{plant.scientificName}</Text>

          <ScrollView
            horizontal
            style={styles.infoSection}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.iconContainer}>
              <Icon name="water-outline" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Per Week</Text>
              <Text style={styles.infoText}>{plant.watering}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="weather-sunny" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Sun Exposure</Text>
              <Text style={styles.infoText}>{`${plant.sunlight}%`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="thermometer-low" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Ideal Temp</Text>
              <Text style={styles.infoText}>{`${plant.temperature}°C`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="water-outline" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Per Week</Text>
              <Text style={styles.infoText}>{plant.watering}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="weather-sunny" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Sun Exposure</Text>
              <Text style={styles.infoText}>{`${plant.sunlight}%`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="thermometer-low" size={30} paddingBottom={3} color="#205950" />
              <Text style={styles.subInfoText}>Ideal Temp</Text>
              <Text style={styles.infoText}>{`${plant.temperature}°C`}</Text>
            </View>
          </ScrollView>
          <Text style={styles.header}>Origin</Text>
          <Text style={styles.text}>{plant.taxonomy.class}</Text>
          <Text style={styles.header}>Family</Text>
          <Text style={styles.text}>{plant.taxonomy.family}</Text>
          <Text style={styles.header}>Genus</Text>
          <Text style={styles.text}>{plant.taxonomy.genus}</Text>
          <Text style={styles.header}>Kingdom</Text>
          <Text style={styles.text}>{plant.taxonomy.kingdom}</Text>
          <Text style={styles.header}>Order</Text>
          <Text style={styles.text}>{plant.taxonomy.order}</Text>
          <Text style={styles.header}>Phylum</Text>
          <Text style={styles.text}>{plant.taxonomy.phylum}</Text>
          <Text style={styles.header}>Description</Text>
          <Text style={styles.text}>{plant.description}</Text>
        </View>
        <View style={{ height: 50 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
    // height is now dynamic and controlled by animation
  },

  detailsContainer: {
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line: {
    alignSelf: "center",
    width: "25%",
    height: 4,
    backgroundColor: "#E3E3E3",
  },
  name: {
    fontSize: 24,
    fontFamily: "OpenSans-Regular",
    fontWeight:"700",
    color: "#000",
    paddingTop: 8,
  },
  scientificName: {
    fontFamily: "OpenSans-Regular",
    fontStyle: "italic",
    fontSize: 16,
    fontWeight: "100",
    color: "#E3E3E3", // Set your desired color
    borderBottomWidth: 1.5,
    borderBottomColor: "#E3E3E3",
    paddingBottom: 8,
    marginBottom: 24, // Increased to create space for the button container
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "column",
    paddingLeft: 8,
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // Change to white background
    borderRadius: 10, // Increase border radius for rounder corners
    marginRight: 10, // Increase margin for more space between icons
    borderColor: "#E3E3E3", // Add border colors
    borderWidth: 1.25,
    width: 100, // Set a fixed width for uniform size
    height: 100, // Set a fixed height for uniform size
  },
  subInfoText: {
    fontSize: 12, // Increase font size
    color: "#E3E3E3", // Change color to a softer black/grey
    fontFamily: "OpenSans-Regular",
    fontWeight: "700",
  },
  infoText: {
    fontSize: 16, // Increase font size
    color: "#646464", // Change color to a softer black/grey
    fontFamily: "OpenSans-Regular",
    fontWeight: "700",
  },
  header: {
    fontFamily: "OpenSans-Regular",
    fontSize: 19,
    fontWeight: "400",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",
    paddingBottom: 10,
  },
  greenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(32, 89, 80, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 4, // Adjust spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8, // Space between icon and text
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute', // Use absolute positioning
    top: 30, // Adjust this value to align with the scientific name
    right: 16, // Adjust this value to position from the right edge
    // Remove the 'left' property if using 'right' for positioning
  },
});

export default PlantDetailScreen;
