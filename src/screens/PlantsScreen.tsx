import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlantContext } from './PlantContext';
import { colors, fonts, fontSize } from "../utils/colors";
import { useIsFocused } from '@react-navigation/native';

export const PlantsScreen = () => {
  const isFocused = useIsFocused();
  const { plants } = useContext(PlantContext);

  useEffect(() => {
      console.log("PlantsScreen is focused with plants:", plants);
  }, [isFocused, plants]);



  return (
      <View style={styles.container}>
          {plants.map((plant, index) => (
              <Text key={index} style={styles.text}>{plant.name}</Text>
              // Make it clickable and navigate to a detailed screen
          ))}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSize.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
  },
});

export default PlantsScreen;
