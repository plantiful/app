import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View, Text, Animated, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { PlantInfo, addPlantt, addRoom, getCurrentUserId } from "../firebase";
import PlantContext from "./PlantContext";
import { colors, fontSize, fonts } from "../utils/colors";

interface ScanScreenProps {
  route: {
    params: {
      plant: PlantInfo;
      onDecision: (decision: boolean) => void;
    };
  };
  navigation: any;
}

const PlantScanScreen: React.FC<ScanScreenProps> = ({ navigation, route }) => {
  const { plant, onDecision } = route.params;
  const { rooms } = useContext(PlantContext); // Assuming you have addRoomToContext method in your context
  const [isRoomSelectorVisible, setIsRoomSelectorVisible] = useState(false);
  const [isTextInputVisible, setTextInputVisible] = useState(false);
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (name: string) => setRoomName(name);

  const handleAddPlant = (roomId: string) => {
    const userId = getCurrentUserId();
    if (userId) {
      addPlantt(userId, roomId, plant);
      navigation.goBack();
    }
    setIsRoomSelectorVisible(false);
  };

  const handleAddRoom = async (roomName: string) => {
    const userId = getCurrentUserId();
    if (userId) {
      try {
        await addRoom(userId, roomName.trim());
        setRoomName('');
        setIsRoomSelectorVisible(false);
        setTextInputVisible(false);
      } catch (error) {
        console.error("Failed to add room:", error);
      }
    } else {
      console.error("Failed to add room: User is not logged in");
    }
  };

  const handleOpenModal = () => setIsRoomSelectorVisible(true);
  const handleCloseModal = () => {
    setIsRoomSelectorVisible(false);
    setTextInputVisible(false);
  };

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [400, 200],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView and other components */}

      <Modal
        visible={isRoomSelectorVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.roomSelectorModal}>
          {/* Existing rooms */}
          {rooms.map((room, index) => (
            <TouchableOpacity key={index} onPress={() => handleAddPlant(room.id)}>
              <Text style={styles.roomName}>{room.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Add new room input and button */}
          {isTextInputVisible && (
            <TextInput
              style={styles.addRoomInput}
              value={roomName}
              onChangeText={handleRoomNameChange}
              placeholder="Enter room name"
              autoFocus={true}
            />
          )}

          {!isTextInputVisible ? (
            <TouchableOpacity onPress={() => setTextInputVisible(true)}>
              <Text style={styles.addRoomText}>Add a new room</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handleAddRoom(roomName)}>
              <Text style={styles.addRoomText}>Confirm Add Room</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    backgroundColor: "transparent",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
    width: "40%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "transparent",
  },
  image: {
    width: "100%",
  },

  detailsContainer: {
    padding: 16,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.background,
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
    width: "30%",
    height: 3,
    backgroundColor: "#E3E3E3",
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.textBlack,
    paddingTop: 8,
  },
  scientificName: {
    fontFamily: "OpenSans-Regular",
    fontStyle: "italic",
    fontSize: 18,
    fontWeight: "100",
    color: "#E3E3E3",
    borderBottomWidth: 1.5,
    borderBottomColor: "#E3E3E3",
    paddingBottom: 8,
    marginBottom: 8,
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 8,
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "400",
    color: "#000",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: colors.textBlack,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",
    paddingBottom: 10,
  },
  roomSelectorModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  roomName: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  addRoomText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  addRoomButton: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  addRoomInput: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
});

export default PlantScanScreen;

