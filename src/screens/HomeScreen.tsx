import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts, fontSizes } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { auth } from "../firebase";

export const HomeScreen = (navigation) => {
  const { t } = i18n;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{t("HomeScreen_welcome_text")}</Text>
      <Text style={styles.welcomeText}>{auth.currentUser.displayName}</Text>
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
  welcomeText: {
    fontSize: fontSizes.large,
    color: colors.textBlack,
    fontFamily: fonts.regular,
  },
  welcomeName: {
    fontSize: fontSizes.large,
    color: colors.textBlack,
    fontFamily: fonts.bold,
  },
});

export default HomeScreen;
