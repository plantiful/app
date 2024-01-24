import React, { useContext, useEffect, useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { PlantContext } from "./PlantContext";
import { colors, fonts, fontSize } from "../utils/colors";
import { PlantScreenProps } from "../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCurrentUserId,
  getRooms as fetchRooms,
  addRoom as createRoom,
  getPlantsInRoom as fetchPlantsInRoom,
  addPlantt as createPlant,
  PlantInfo // Importing the PlantInfo interface
} from '../firebase'; // Adjust the import path
import Swiper from 'react-native-swiper';


export const PlantsScreen: React.FC<PlantScreenProps> = ({ navigation }) => {
  const { rooms, currentRoomIndex, setCurrentRoomIndex } = useContext(PlantContext);
  const [roomPlants, setRoomPlants] = useState<PlantInfo[][]>(Array(rooms.length).fill([]));

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

  const goToPreviousRoom = () => {
    setCurrentRoomIndex(currentRoomIndex > 0 ? currentRoomIndex - 1 : rooms.length - 1);
  };

  const goToNextRoom = () => {
    setCurrentRoomIndex(currentRoomIndex < rooms.length - 1 ? currentRoomIndex + 1 : 0);
  };

  const renderRoom = (room, index) => {
    // Render a FlatList for the current room
    return (
      <View key={room.id} style={styles.roomContainer}>
        <FlatList
          data={roomPlants[index]}
          renderItem={renderPlantItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          style={styles.list}
        />
      </View>
    );
  };

  const RoomIndicator = ({ rooms, currentRoomIndex }) => {
  return (
    <View style={styles.indicatorContainer}>
      {rooms.map((_, index) => (
        <View
          key={index}
          style={[
            styles.bubble,
            currentRoomIndex === index ? styles.activeBubble : styles.inactiveBubble,
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
    <Image source={{ uri: item.photo }} style={styles.image} />
    <SafeAreaView style={styles.textContainer}>
      <Text style={styles.text}>{item.commonName}</Text>
      <Text style={styles.subtext}>{item.scientificName}</Text>
      <Text style={styles.subtext}>{item.lastWatered} days ago</Text>
      <Text style={[
        styles.supportText,
        item.lastWatered >= 2 ? {opacity: 1} : { opacity: 0 }
      ]}>
        Requiring support
      </Text>
    </SafeAreaView>
  </TouchableOpacity>
);

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.roomNameText}>
      {rooms[currentRoomIndex] ? rooms[currentRoomIndex].name : 'No Room Selected'}
    </Text>
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
    <RoomIndicator rooms={rooms} currentRoomIndex={currentRoomIndex} />
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
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
  },
  plantItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    // Sizing adjustments
    width: '90%', // Consider using a percentage or fixed width
    minHeight: 120, // Adjust the minimum height as needed
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  listContentContainer: {
    // Style the container of the FlatList items
    padding: 10, // Add padding if necessary
    alignItems: 'flex-start', // Align items to the start of the FlatList
    paddingBottom: 20, // Add padding to the bottom for scrollability
  },
  textContainer: {
    flex: 1,
    paddingVertical: 0, // Adjust or remove padding if not needed
    justifyContent: "center", // This centers the text vertically in the container
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
  },
  arrowText: {
    fontSize: 24, // Adjust as needed
    fontFamily: "OpenSans-Regular",

  },
  arrowButton: {
  padding: 10, // You can adjust this value to increase the tappable area
  justifyContent: 'center',
  alignItems: 'center',
},
  list: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeBubble: {
    backgroundColor: 'green',
  },
  inactiveBubble: {
    backgroundColor: 'black',
  },
  roomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Make sure the room container takes up the full size of the swiper view
    width: '100%',
  },
});

export default PlantsScreen;
