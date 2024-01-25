import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PlantContext, Room } from "./PlantContext";
import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import { PlantsScreenProps } from "../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentUserId,
  getPlantsInRoom,
  addPlantt,
  PlantInfo,
} from "../firebase";
import Swiper from "react-native-swiper";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const PlantsScreen: React.FC<PlantsScreenProps> = ({ navigation }) => {
  const { rooms, currentRoomIndex, setCurrentRoomIndex } =
    useContext(PlantContext);
  const [roomPlants, setRoomPlants] = useState<PlantInfo[][]>(
    Array(rooms.length).fill([])
  );

  useEffect(() => {
    const fetchPlantsForAllRooms = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const newRoomPlants = await Promise.all(
          rooms.map(async (room) => {
            const plantsInRoom = await getPlantsInRoom(userId, room.id);
            return plantsInRoom;
          })
        );
        setRoomPlants(newRoomPlants);
      }
    };

    fetchPlantsForAllRooms();
  }, [rooms]);

  const RoomIndicator = ({ rooms, currentRoomIndex }) => {
    return (
      <View>
        {rooms.map((index: number) => (
          <View
            key={index}
            style={[
              styles.bubble,
              currentRoomIndex === index
                ? { backgroundColor: "black" }
                : { backgroundColor: colors.primary },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderPlant = (plant: PlantInfo) => (
    <TouchableOpacity
      style={styles.plantContainer}
      onPress={() => navigation.navigate("PlantDetailScreen", { plant: plant })}
    >
      <Image source={{ uri: plant.photo }} style={styles.plantImage} />
      <View style={styles.plantInfoContainer}>
        <Text style={styles.plantName}>
          {plant.nickname.length ? plant.nickname : plant.commonName}
        </Text>
        <Text style={styles.plantScientificName}>{plant.scientificName}</Text>
        <View style={styles.plantLastWateredContainer}>
          <Entypo
            name="drop"
            size={20}
            color={plant.lastWatered >= plant.watering ? "red" : colors.primary}
          />
          <Text
            style={[
              styles.plantLastWatered,
              plant.lastWatered >= plant.watering
                ? { color: "red" }
                : { color: colors.textGrey },
            ]}
          >
            {plant.lastWatered} {plant.lastWatered === 1 ? "day" : "days"} ago{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.roomNameText}>
        {rooms[currentRoomIndex]
          ? rooms[currentRoomIndex].name
          : "Add a room to get started!"}
      </Text>
      <Swiper
        loop={false}
        showsPagination={false}
        index={currentRoomIndex}
        onIndexChanged={(index) => setCurrentRoomIndex(index)}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {rooms.map((room: Room, index: number) => (
            <FlatList
              key={room.id}
              data={roomPlants[index]}
              renderItem={(plant) => renderPlant(plant.item)}
              contentContainerStyle={styles.listContentContainer}
            />
          ))}
        </ScrollView>
      </Swiper>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.padding,
    alignItems: "center",
    justifyContent: "space-between", // Adjust based on layout needs
  },
  roomName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    textAlign: "center",
    paddingTop: defaultStyles.padding,
    paddingBottom: defaultStyles.padding,
  },
  plantContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: defaultStyles.rounding,
    padding: defaultStyles.padding / 2,
    width: "100%",
    marginBottom: defaultStyles.padding,
    shadowOpacity: 0.15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: defaultStyles.rounding,
    elevation: 5,
  },
  plantImage: {
    width: 100,
    height: 100,
    borderRadius: defaultStyles.rounding,
  },
  listContentContainer: {
    // Style the container of the FlatList items
    padding: 10, // Add padding if necessary
    alignItems: "flex-start", // Align items to the start of the FlatList
    paddingBottom: 20, // Add padding to the bottom for scrollability
    backgroundColor: "transparent",
  },
  textContainer: {
    flex: 1,
    paddingLeft: defaultStyles.padding,
  },
  plantName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  plantScientificName: {
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textGrey,
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
    top: 10, // Adjust this value to position correctly in the view
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
    borderRadius: 30,
  },
  indicatorContainer: {
    position: "absolute", // Position the indicators absolutely
    bottom: 10, // Position it at the bottom of the parent container, adjust as needed
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0)", // Ensure background is transparent
  },

  bubble: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    margin: 10,
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
  plantInfoContainer: {
    flex: 1,
    paddingLeft: defaultStyles.padding,
  },
  roomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // Make sure the room container takes up the full size of the swiper view
    width: "100%",
  },
});

export default PlantsScreen;
