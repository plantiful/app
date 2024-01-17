import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { ProfileScreenProps } from "../utils/types";

// Firebase
import { auth } from "../firebase";

// Components
import ButtonBack from "../components/ButtonBack";
import ButtonWide from "../components/ButtonWide";

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToNotificationSettings = () => {
    navigation.navigate("NotificationSettings");
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        onAuthChange(false);
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={goBack} />

      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileCircleText}>
            {auth.currentUser?.displayName?.charAt(0)}
          </Text>
        </View>
        <Text style={styles.profileNameText}>
          {auth.currentUser?.displayName}
        </Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => {}}>
          <Text style={styles.editProfileButtonText}>
            {t("ProfileScreen_edit_profile_button_text")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={{ paddingRight: defaultStyles.padding }}>
          <Text style={styles.statsNumber}>0</Text>
          <Text style={styles.statsText}>
            {t("ProfileScreen_stats_plants_text")}
          </Text>
        </View>

        <View style={{ paddingLeft: defaultStyles.padding }}>
          <Text style={styles.statsNumber}>0</Text>
          <Text style={styles.statsText}>
            {t("ProfileScreen_stats_streak_text")}
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.line} />

        <View style={styles.buttonsContainer}>
          <ButtonWide
            border={true}
            borderColor={colors.textGrey}
            text={t("ProfileScreen_notifications_button_text")}
            textColor={colors.textGrey}
            onPress={navigateToNotificationSettings}
          />

          <View style={{ height: defaultStyles.padding }} />
          <ButtonWide
            border={true}
            borderColor={colors.textGrey}
            text={t("ProfileScreen_help_n_support_button_text")}
            textColor={colors.textGrey}
            onPress={() => {}}
          />

          <View style={{ height: defaultStyles.padding }} />
          <ButtonWide
            border={true}
            borderColor={colors.textGrey}
            text={t("ProfileScreen_settings_button_text")}
            textColor={colors.textGrey}
            onPress={navigateToSettings}
          />

          <View style={{ height: defaultStyles.padding }} />
          <ButtonWide
            border={true}
            borderColor="red"
            text={t("ProfileScreen_sign_out_button_text")}
            textColor="red"
            onPress={logout}
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
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: defaultStyles.padding * 2,
  },
  profileCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
  profileCircleText: {
    fontFamily: fonts.medium,
    fontSize: 45,
    color: colors.textWhite,
  },
  profileNameText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
    paddingTop: defaultStyles.padding / 2,
  },
  editProfileButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.textGrey,
    marginTop: defaultStyles.padding / 2,
  },
  editProfileButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textGrey,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: defaultStyles.padding,
  },
  statsNumber: {
    textAlign: "center",
    fontFamily: fonts.bold,
    fontSize: fontSize.largePlus,
    color: colors.textGrey,
  },
  statsText: {
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textGrey,
  },
  bottomContainer: {
    justifyContent: "center",
    paddingTop: defaultStyles.padding,
  },
  line: {
    width: "90%",
    alignSelf: "center",
    borderBottomColor: colors.textGrey,
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    width: "80%",
    alignSelf: "center",
    paddingTop: defaultStyles.padding,
  },
});

export default ProfileScreen;
