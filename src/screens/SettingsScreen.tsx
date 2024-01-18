import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { SettingsScreenProps } from "../utils/types";

// Firebase
import { auth } from "../firebase";

// Components
import ButtonBack from "../components/ButtonBack";
import ButtonRowWithIconBack from "../components/ButtonRowWithIconBack";

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

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
          <Text style={styles.cathegoryText}>Account Settings</Text>

          <ButtonRowWithIconBack
            text="Change Name"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Change Email"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Change Password"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Delete Account"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />
        </View>

        <View style={styles.cathegoryContainer}>
          <Text style={styles.cathegoryText}>App Settings</Text>

          <ButtonRowWithIconBack
            text="Notifications"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToNotificationSettings}
          />

          <ButtonRowWithIconBack
            text="Language"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={navigateToLanguageSettings}
          />

          <ButtonRowWithIconBack
            text="Theme"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />
        </View>

        <View style={styles.cathegoryContainer}>
          <Text style={styles.cathegoryText}>About</Text>

          <ButtonRowWithIconBack
            text="Privacy Policy"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Terms of Service"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Contact Us"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={null}
          />

          <ButtonRowWithIconBack
            text="Log Out"
            textColor="red"
            iconSet="Ionicons"
            iconName="chevron-forward-outline"
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
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
