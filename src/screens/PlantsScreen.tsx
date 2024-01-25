import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
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
    async function fetchPlantsForAllRooms() {
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
    }

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
                : { backgroundColor: "green" },
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
      <Image source={{ uri: plant.photo }} style={styles.plantPhoto} />
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
      <Text style={styles.roomName}>
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
        {rooms.map((room: Room, index: number) => (
          <FlatList
            key={room.id}
            data={roomPlants[index]}
            renderItem={(plant) => renderPlant(plant.item)}
            contentContainerStyle={styles.listContentContainer}
          />
        ))}
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
    justifyContent: "center",
    alignItems: "center",
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
  plantPhoto: {
    width: 100,
    height: 100,
    borderRadius: defaultStyles.rounding,
  },
  plantInfoContainer: {
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
  listContentContainer: {
    padding: 10,
    paddingBottom: 20,
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
  bubble: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    margin: 15,
  },
});

export default PlantsScreen;
