import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { HomeScreenProps } from "../utils/types";

// Firebase
import { auth } from "../firebase";

// Components
import ModalConfirm from "../components/ModalConfirm";
import ButtonIcon from "../components/ButtonIcon";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = i18n;

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const checkEmailVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified === false) {
      setShowEmailConfirmation(true);
    }
  };

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToNotifications = () => {
    // navigation.navigate("Notifications");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalConfirm
        title={t("HomeScreen_email_confirmation_title")}
        text={t("HomeScreen_email_confirmation_text")}
        buttonText={t("HomeScreen_email_confirmation_button")}
        isVisible={showEmailConfirmation}
        onClose={() => setShowEmailConfirmation(false)}
      />

      <View style={styles.topContainer}>
        <View
          style={[
            styles.topContainer,
            { marginRight: -defaultStyles.padding / 2 },
          ]}
        >
          <ButtonIcon
            iconSet="Ionicons"
            iconName="notifications-outline"
            onPress={navigateToNotifications}
          />
        </View>

        <View
          style={[
            styles.topContainer,
            { marginRight: -defaultStyles.padding / 2 },
          ]}
        >
          <ButtonIcon
            iconSet="Ionicons"
            iconName="settings-outline"
            onPress={navigateToSettings}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.padding,
    paddingTop: defaultStyles.padding,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
