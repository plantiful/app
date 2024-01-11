import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, fontSize } from "../utils/colors";

export const PlantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plant Pod Screen</Text>
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
