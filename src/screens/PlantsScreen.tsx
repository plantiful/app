import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import {
  getPlantsInRoom as fetchPlantsInRoom,
  getRooms as fetchRooms,
  getCurrentUserId,
  PlantInfo,
} from "../firebase";
import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import { PlantsScreenProps } from "../utils/types";
import { PlantContext } from "./PlantContext";

export const PlantsScreen: React.FC<PlantsScreenProps> = ({ navigation }) => {
  const { rooms, currentRoomIndex, setCurrentRoomIndex, updateRooms } =
    useContext(PlantContext);
  const roomsRef = useRef(rooms);
  const [roomPlants, setRoomPlants] = useState<PlantInfo[][]>(
    Array(rooms.length).fill([])
  );

  useEffect(() => {
    async function fetchPlantsForAllRooms() {
      console.log("Entered fetchPlantsForAllRooms");
      const userId = getCurrentUserId();
      if (userId) {
        const fetchedRooms = await fetchRooms(userId);
        if (JSON.stringify(fetchedRooms) !== JSON.stringify(roomsRef.current)) {
          roomsRef.current = fetchedRooms; // Update the ref, but not the state
          updateRooms(fetchedRooms); // Update the state only if necessary
        }
        const newRoomPlants = await Promise.all(
          fetchedRooms.map(async (room) => {
            console.log("fetching plants for room", room.id);
            const fetchedPlants = await fetchPlantsInRoom(userId, room.id);
            return fetchedPlants;
          })
        );
        setRoomPlants(newRoomPlants);
      }
    }
    console.log("rooms changed");
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
      <View style={styles.requiringSupportButton}>
        <Ionicons
          name="chevron-forward-outline"
          size={26}
          color={colors.textBlack}
        />
      </View>
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

      {/* <View style={styles.addPlantContainer}>
        <TouchableOpacity
          style={styles.addPlantButton}
          onPress={() => navigation.navigate("AddPlantScreen")}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
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
    width: "90%",
    minHeight: 120,
    justifyContent: "space-between",
  },
  imageContainer: {
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
    justifyContent: "center",
    marginLeft: 16,
  },
  supportText: {
    fontSize: fontSize.medium,
    fontFamily: fonts.medium,
    color: "red",
    height: fontSize.medium + 16,
    opacity: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  listContentContainer: {
    padding: 10,
    alignItems: "flex-start",
    paddingBottom: 20,
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
    padding: 16,
  },
  roomNameText: {
    fontSize: 18,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    textAlign: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 50,
    position: "absolute",
    bottom: 35,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  arrowText: {
    fontSize: 24,
    fontFamily: "OpenSans-Regular",
  },
  arrowButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },

  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
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
    width: "100%",
  },
  plantLastWateredContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: defaultStyles.padding / 2,
  },
  chevronIcon: {
    color: colors.primary,
    backgroundColor: "#E3E3E3",
    padding: 3,
    borderRadius: 50,
  },
  requiringSupportButton: {
    left: 35,

    color: colors.primary,
    backgroundColor: colors.background,
    width: 40,
    height: 40,
    borderColor: "#E3E3E3",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
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
