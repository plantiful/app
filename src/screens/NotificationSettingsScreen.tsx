import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { NotificationSettingsScreenProps } from "../utils/types";

// Firebase
import { auth } from "../firebase";

// Components
import ButtonBack from "../components/ButtonBack";

export const SettingsScreen: React.FC<NotificationSettingsScreenProps> = ({
  navigation,
}) => {
  const { t } = i18n;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={goBack} />
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
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textGrey,
  },
});

export default SettingsScreen;
