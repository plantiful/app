import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { PlantContext } from "./PlantContext";
import { PlantsScreenProps } from "../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentUserId,
  getRooms as fetchRooms,
  addRoom as createRoom,
  getPlantsInRoom as fetchPlantsInRoom,
  addPlantt as createPlant,
  PlantInfo, // Importing the PlantInfo interface
} from "../firebase"; // Adjust the import path
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const PlantsScreen: React.FC<PlantsScreenProps> = ({ navigation }) => {
  const { rooms, currentRoomIndex, setCurrentRoomIndex } =
    useContext(PlantContext);
  const [roomPlants, setRoomPlants] = useState<PlantInfo[][]>(
    Array(rooms.length).fill([])
  );

  useEffect(() => {
    async function fetchPlantsForAllRooms() {
      const userId = getCurrentUserId();
      if (userId) {
        const newRoomPlants = await Promise.all(
          rooms.map(async (room) => {
            const fetchedPlants = await fetchPlantsInRoom(userId, room.id);
            return fetchedPlants;
          })
        );
        setRoomPlants(newRoomPlants);
      }
    }

    fetchPlantsForAllRooms();
  }, [rooms]);

  const RoomIndicator = ({ rooms, currentRoomIndex }) => {
    return (
      <View style={styles.indicatorContainer}>
        {rooms.map((_, index) => (
          <View
            key={index}
            style={[
              styles.bubble,
              currentRoomIndex === index
                ? styles.activeBubble
                : styles.inactiveBubble,
            ]}
          />
        ))}
      </View>
    );
  };


const renderPlantItem = ({ item }) => (
  <TouchableOpacity
    style={styles.plantItem}
    onPress={() => navigation.navigate("PlantDetailScreen", { plant: item })}
  >
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{item.commonName}</Text>
      <Text style={styles.subtext}>{item.scientificName}</Text>
      <View style={styles.plantLastWateredContainer}>
        <Entypo
          name="drop"
          size={20}
          color={item.lastWatered >= item.watering ? "red" : colors.primary}
        />
        <Text
          style={[
            styles.plantLastWatered,
            item.lastWatered >= item.watering
              ? { color: "red" }
              : { color: colors.textGrey },
          ]}
        >
          {item.lastWatered} {item.lastWatered === 1 ? "day" : "days"} ago
        </Text>
      </View>
    </View>
    <Ionicons
      name="chevron-forward-outline"
      size={30}
      color={colors.primary}
      style={styles.chevronIcon}
    />
  </TouchableOpacity>
);

return (
  <SafeAreaView style={styles.container}>
    <Swiper
      loop={false}
      showsPagination={false}
      index={currentRoomIndex}
      onIndexChanged={(index) => setCurrentRoomIndex(index)}
    >
      {rooms.map((room, index) => (
        <FlatList
          key={room.id}
          data={roomPlants[index]}
          renderItem={renderPlantItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
        />
      ))}
      
    </Swiper>
    <Text style={styles.roomNameText}>
        {rooms[currentRoomIndex]
          ? rooms[currentRoomIndex].name
          : "Add a room to get started!"}
      </Text>
    <RoomIndicator rooms={rooms} currentRoomIndex={currentRoomIndex} />

      <View style={styles.addPlantContainer}>
        <TouchableOpacity
          style={styles.addPlantButton}
          onPress={() => navigation.navigate("AddPlantScreen")}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    right: 25,
    marginHorizontal: 16,
    width: '90%', // Consider using a percentage or fixed width
    minHeight: 120, // Adjust the minimum height as needed
    justifyContent: "space-between", // This will space out your image, text container, and chevron icon
  },
  imageContainer: {
    // Container for the image to help with alignment
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center", // Center the text vertically
    marginLeft: 16, // Add some space between the image and the text
  },
  chevronIcon: {
    // Adjustments for the chevron icon to ensure it's aligned properly
    left: 35, // Ensure there's some space between the text and the icon
    color: colors.primary,
    backgroundColor: "#E3E3E3",
    padding: 3,
    borderRadius: 50,
  },
  supportText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.medium,
    color: "red",
    // Set the height to be the font size plus any desired padding.
    // For example, if your font size is 16 and you want 8 points of padding on the top and bottom:
    height: fontSize.medium + 16, // Adjust this based on your actual font size and desired padding
    opacity: 0, // Default to transparent
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between", // Adjust based on layout needs
  },
  listContentContainer: {
    // Style the container of the FlatList items
    padding: 10, // Add padding if necessary
    alignItems: "flex-start", // Align items to the start of the FlatList
    paddingBottom: 20, // Add padding to the bottom for scrollability
    backgroundColor: "transparent",
  },
  text: {
    fontSize: fontSize.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
  },
  subtext: {
    fontSize: fontSize.medium,
    fontFamily: fonts.light,
    color: colors.textGrey,
  },
  roomSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 20,
    padding: 16, // Adjust as needed
  },
  roomNameText: {
    fontSize: 18, // Adjust as needed
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    textAlign: "center",
    backgroundColor: "#fff", // White background for the text bubble
    paddingHorizontal: 16, // Horizontal padding
    paddingVertical: 8, // Vertical padding
    borderRadius: 20, // Rounded corners
    overflow: "hidden", // Ensures the background doesn't bleed out of the corners
    alignSelf: "center", // Center the text bubble in the parent container
    marginTop: 50, // Space from the top or from the previous element
    position: "absolute", // Absolutely position the text
    bottom: 35, // Adjust this value to position correctly in the view
    zIndex: 1, // Make sure this is above the Swiper's zIndex
    // iOS shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },

  arrowText: {
    fontSize: 24, // Adjust as needed
    fontFamily: "OpenSans-Regular",
  },
  arrowButton: {
    padding: 10, // You can adjust this value to increase the tappable area
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute", // Position the indicators absolutely
    bottom: 0, // Position it at the bottom of the parent container, adjust as needed
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0)", // Ensure background is transparent
  },

  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "white", // Or any color you wish to have for the inactive bubble
    // iOS shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },

  activeBubble: {
    backgroundColor: "green",
  },
  inactiveBubble: {
    backgroundColor: "black",
  },
  roomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Make sure the room container takes up the full size of the swiper view
    width: "100%",
  },
  plantLastWateredContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: defaultStyles.padding / 2,
  },
  plantLastWatered: {
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    paddingLeft: 5,
  },
  addPlantContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "flex-end",
    paddingBottom: defaultStyles.padding,
  },
  addPlantButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    right: 20,
    borderRadius: 30,
  },
});

export default PlantsScreen;
