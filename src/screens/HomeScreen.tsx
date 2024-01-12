import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth } from "../firebase";

import ModalConfirm from "../components/ModalConfirm";

export const HomeScreen = (navigation) => {
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
      <Text style={styles.welcomeName}>{auth.currentUser.displayName}</Text>
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
  emailConfirmationCenteredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: defaultStyles.paddingLeft,
  },
  emailConfirmationContainer: {
    alignItems: "center",
    padding: defaultStyles.paddingLeft,
    backgroundColor: colors.background,
    borderRadius: 8,
    shadowOpacity: 0.2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  emailConfirmationTitle: {
    fontFamily: fonts.bold,
    fontSize: defaultStyles.paddingLeft,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: 10,
  },
  emailConfirmationText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.large,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: 20,
  },
  emailConfirmationButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
  },
  emailConfirmationButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textWhite,
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
});

export default HomeScreen;
