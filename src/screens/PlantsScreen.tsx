import React, { useContext, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "./PlantContext";
import { colors, fonts, fontSize } from "../utils/colors";
import { PlantScreenProps } from "../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";

export const PlantsScreen: React.FC<PlantScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { plants, rooms, currentRoomIndex, setCurrentRoomIndex } =
    useContext(PlantContext);

  // Filter plants for the current room
  const plantsInCurrentRoom = plants.filter(
    (plant) => plant.roomId === rooms[currentRoomIndex].id
  );

  const goToPreviousRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1);
    } else if (currentRoomIndex == 0) {
      setCurrentRoomIndex(rooms.length - 1);
    }
  };

  const goToNextRoom = () => {
    if (currentRoomIndex < rooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1);
    } else if (currentRoomIndex == rooms.length - 1) {
      setCurrentRoomIndex(0);
    }
  };
  const renderPlantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.plantItem}
      onPress={() => navigation.navigate("PlantDetailScreen", { plant: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <SafeAreaView style={styles.textContainer}>
        <Text style={styles.text}>{item.commonName}</Text>
        <Text style={styles.subtext}>{item.scientificName}</Text>
        <Text style={styles.subtext}>{item.lastWatered} days ago</Text>
        {item.lastWatered >= 4 && (
          <Text style={styles.supportText}>Requiring support</Text>
        )}
      </SafeAreaView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.roomSelectorContainer}>
        <TouchableOpacity onPress={goToPreviousRoom}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.roomNameText}>{rooms[currentRoomIndex].name}</Text>
        <TouchableOpacity onPress={goToNextRoom}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={plantsInCurrentRoom}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // align items to the start of the container
    // other styles...
    marginVertical: 8,
    marginHorizontal: 16,
    minHeight: 120,
    padding: 16,
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
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
    justifyContent: "space-between",
    padding: 16, // Adjust as needed
  },
  roomNameText: {
    fontSize: fontSize.large, // Adjust as needed
    fontFamily: fonts.medium,
    textAlign: "center",
  },
  arrowText: {
    fontSize: fontSize.large, // Adjust as needed
    fontFamily: fonts.medium,
  },
  list: {
    flex: 1,
  },
});

export default PlantsScreen;
