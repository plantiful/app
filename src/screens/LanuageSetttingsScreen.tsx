import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { LanguageSettingsScreenProps } from "../utils/types";

// Components
import ButtonBack from "../components/ButtonBack";
import ButtonRowWithIconFront from "../components/ButtonRowWithIconFront";

export const SettingsScreen: React.FC<LanguageSettingsScreenProps> = ({
  navigation,
}) => {
  const goBack = () => {
    navigation.goBack();
  };

  const languageMapping = {
    en: "English",
    cs: "Čeština",
    al: "Shqip",
    sk: "Slovenčina",
  };

  const changeLanguage = (langKey: string) => {
    i18n.changeLanguage(langKey);
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={goBack} />
      <ScrollView style={styles.languagesContainer}>
        {Object.entries(languageMapping).map(([langKey, langName]) => (
          <ButtonRowWithIconFront
            text={langName}
            onPress={() => changeLanguage(langKey)}
            iconSet="MaterialCommunityIcons"
            iconName="earth"
          />
        ))}
      </ScrollView>
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
  languagesContainer: {
    marginTop: defaultStyles.padding,
  },
});

export default SettingsScreen;
