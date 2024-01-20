import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlantContext } from "./PlantContext";
import { colors, fonts, fontSize } from "../utils/colors";
import { PlantScreenProps } from "../utils/types";

export const PlantsScreen: React.FC<PlantScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { plants } = useContext(PlantContext);

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.plantItem}
      onPress={() => navigation.navigate("PlantDetailScreen", { plant: item })}
    >
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={plants}
      renderItem={renderPlantItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  plantItem: {
    flex: 1,
    margin: 10,
    height: 150, // Adjust the height as needed
    borderRadius: 10, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color for the item
    // Add shadow or other styling as needed
  },
  text: {
    fontSize: fontSize.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
  },
});

export default PlantsScreen;
