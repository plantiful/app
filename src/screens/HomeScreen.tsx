import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth } from "../firebase";

// Components
import ModalConfirm from "../components/ModalConfirm";

// Icons
import { Ionicons } from "@expo/vector-icons";

export const HomeScreen = () => {
  const { t } = i18n;

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  useEffect(() => {
    const checkEmailVerification = () => {
      const user = auth.currentUser;
      if (user && user.emailVerified === false) {
        setShowEmailConfirmation(true);
      }
    };

    checkEmailVerification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ModalConfirm
        title={t("HomeScreen_email_confirmation_title")}
        text={t("HomeScreen_email_confirmation_text")}
        buttonText={t("HomeScreen_email_confirmation_button")}
        isVisible={showEmailConfirmation}
        onClose={() => setShowEmailConfirmation(false)}
      />

      <Text style={styles.welcomeText}>{t("HomeScreen_welcome_text")}</Text>
      <Text style={styles.welcomeName}>{auth.currentUser?.displayName}</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.welcomeText}>{t("HomeScreen_search_text")}</Text>
        <Ionicons name="search" size={24} color={colors.textBlack} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.paddingLeft,
    paddingTop: defaultStyles.paddingTop,
  },
  welcomeText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  welcomeName: {
    fontFamily: fonts.bold,
    fontSize: 36,
    color: colors.textBlack,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default HomeScreen;
