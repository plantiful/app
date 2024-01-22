import React, { useContext } from "react";
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
  const { plants } = useContext(PlantContext);

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
      </SafeAreaView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={plants}
      renderItem={renderPlantItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  plantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fff',
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
});

export default PlantsScreen;
