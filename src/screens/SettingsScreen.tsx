import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { SettingsScreenProps } from "../utils/types";

// Firebase
import { auth } from "../firebase";

// Components
import ButtonBack from "../components/ButtonBack";
import ButtonRowWithIconBack from "../components/ButtonRowWithIconBack";
import ModalChoice from "../components/ModalChoice";

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

  const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] =
    useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        onAuthChange(false);
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  const toggleDeleteAccountConfirmation = () => {
    setShowDeleteAccountConfirmation(!showDeleteAccountConfirmation);
  };

  const handleDeleteAccount = () => {
    auth.currentUser?.delete();
    handleSignOut();
  };

  const navigateToChangeName = () => {
    navigation.navigate("ChangeName");
  };

  const navigateToChangeEmail = () => {
    navigation.navigate("ChangeEmail");
  };

  const navigateToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const navigateToNotificationSettings = () => {
    navigation.navigate("NotificationSettings");
  };

  const navigateToLanguageSettings = () => {
    navigation.navigate("LanguageSettings");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingLeft: defaultStyles.padding }}>
        <ButtonBack onPress={goBack} />
      </View>
      <ScrollView>
        <View style={{ height: defaultStyles.padding * 2 }} />

        <View style={styles.cathegoryContainer}>
          <Text style={styles.cathegoryText}>
            {t("SettingsScreen_account_settings_cathegory_text")}
          </Text>

          <ButtonRowWithIconBack
            text={t("SettingsScreen_change_name_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToChangeName}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_change_email_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToChangeEmail}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_change_password_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToChangePassword}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_delete_account_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={toggleDeleteAccountConfirmation}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_sign_out_button_text")}
            textColor="red"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={handleSignOut}
          />
        </View>

        <View style={styles.cathegoryContainer}>
          <Text style={styles.cathegoryText}>
            {t("SettingsScreen_app_settings_cathegory_text")}
          </Text>

          <ButtonRowWithIconBack
            text={t("SettingsScreen_notifications_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToNotificationSettings}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_language_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToLanguageSettings}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_theme_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />
        </View>

        <View style={styles.cathegoryContainer}>
          <Text style={styles.cathegoryText}>
            {t("SettingsScreen_about_cathegory_text")}
          </Text>

          <ButtonRowWithIconBack
            text={t("SettingsScreen_privacy_policy_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_terms_of_use_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text={t("SettingsScreen_contact_us_button_text")}
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />
        </View>
      </ScrollView>

      <ModalChoice
        title={t("SettingsScreen_delete_account_alert_title")}
        text={t("SettingsScreen_delete_account_alert_text")}
        firstButtonText={t("SettingsScreen_delete_account_alert_cancel")}
        secondButtonText={t("SettingsScreen_delete_account_alert_confirm")}
        isVisible={showDeleteAccountConfirmation}
        onFirstButtonPress={toggleDeleteAccountConfirmation}
        onSecondButtonPress={handleDeleteAccount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: defaultStyles.padding,
  },
  cathegoryContainer: {
    backgroundColor: "#FaFaFa",
    marginBottom: defaultStyles.padding,
    paddingHorizontal: defaultStyles.padding,
  },
  cathegoryText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    textAlign: "left",
    paddingBottom: defaultStyles.padding / 2,
  },
});

export default SettingsScreen;
