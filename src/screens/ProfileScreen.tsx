import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { colors, fonts, fontSizes } from "../utils/colors";

// Firebase
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export const ProfileScreen = (onAuthChange) => {
  async function handleSignOut() {
    try {
      await signOut(auth);
      onAuthChange(false);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Text style={styles.text} onPress={handleSignOut}>
        Sign Out
      </Text>
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
    fontFamily: fonts.medium,
    color: colors.textBlack,
  },
});

export default ProfileScreen;
