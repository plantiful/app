import React, { useRef, useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { PlantInfo, addPlantt, addRoom, getCurrentUserId } from "../firebase";
import PlantContext from "./PlantContext";
import { colors, fontSize, fonts } from "../utils/colors";
import { set } from "firebase/database";

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

  const [isRoomSelectorVisible, setIsRoomSelectorVisible] = useState(false);
  const { rooms } = useContext(PlantContext);
  const [isTextInputVisible, setTextInputVisible] = useState(false);

  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (name: string) => {
    setRoomName(name);
  };

  const handleAddPlant = (roomId: string) => {
    const userId = getCurrentUserId();
    if (userId) {
      addPlantt(userId, roomId, plant);
      navigation.goBack();
    }
    setIsRoomSelectorVisible(false);
  };

  const handleAddRoom = (roomName: string) => {
    const userId = getCurrentUserId();
    if (userId) {
      addRoom(userId, roomName);
    }
    setIsRoomSelectorVisible(false);
  };

  useEffect(() => {
    setIsRoomSelectorVisible(false);
    setIsRoomSelectorVisible(true);
  }, [rooms]);

  const handleAdd = () => {
    onDecision(true);
    navigation.goBack();
  };

  const handleDiscard = () => {
    onDecision(false);
    navigation.goBack();
  };
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [400, 200],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={8}
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
          <Text style={styles.scientificName}>{plant.scientificName}</Text>
          <ScrollView
            horizontal
            style={styles.infoSection}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.iconContainer}>
              <Icon name="water" size={24} color="#000" />
              <Text style={styles.infoText}>{plant.watering}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="weather-sunny" size={24} color="#000" />
              <Text style={styles.infoText}>{`${plant.sunlight}%`}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="thermometer" size={24} color="#000" />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleDiscard}>
          <Text style={styles.buttonText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isRoomSelectorVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.roomSelectorModal}>
          {rooms.map((room, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAddPlant(room.id)}
            >
              <Text style={styles.roomName}>{room.name}</Text>
            </TouchableOpacity>
          ))}
          {isTextInputVisible && (
            <TextInput
              style={styles.addRoomInput}
              value={roomName}
              onChangeText={handleRoomNameChange}
              placeholder="Enter room name"
            />
          )}
          <TouchableOpacity
            onPress={() => setTextInputVisible(!isTextInputVisible)}
          >
            <Text style={styles.addRoomText}>Add a new room</Text>
          </TouchableOpacity>
          {isTextInputVisible && (
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
