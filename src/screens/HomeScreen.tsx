import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts, fontSizes } from "../utils/colors";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
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
    fontSize: fontSizes.large,
    color: colors.textBlack,
    fontFamily: fonts.regular,
  },
});

export default HomeScreen;
