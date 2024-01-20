import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, defaultStyles } from "../utils/colors";
import { NavigationProp } from "@react-navigation/native";
import ButtonBack from "../components/ButtonBack";
import { useLanguage } from "../utils/LanguageContext";

// Importing flags as React Components
import USFlag from "./../../assets/images/Flags/us.svg";
import CZFlag from "./../../assets/images/Flags/cz.svg";
import SKFlag from "./../../assets/images/Flags/sk.svg";
import ALFlag from "./../../assets/images/Flags/al.svg";

const flags = {
  en: USFlag,
  cs: CZFlag,
  sk: SKFlag,
  al: ALFlag,
};

type LanguageSettingsScreenProps = {
  navigation: NavigationProp<any>;
};

export const LanguageSettingsScreen: React.FC<LanguageSettingsScreenProps> = ({
  navigation,
}) => {
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const goBack = () => {
    navigation.goBack();
  };

  const languageMapping: { [key: string]: string } = {
    en: "English",
    cs: "Čeština",
    al: "Shqip",
    sk: "Slovenčina",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack onPress={goBack} />
      <View style={styles.languagesContainer}>
        {Object.entries(languageMapping).map(([langKey, langName]) => {
          const FlagIcon = flags[langKey];
          return (
            <TouchableOpacity
              key={langKey}
              style={styles.languageButton}
              onPress={() => setLanguage(langKey)}
            >
              <FlagIcon width={30} height={20} />
              <Text style={styles.languageText}>{langName}</Text>
              {language === langKey && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
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
  languagesContainer: {
    marginTop: defaultStyles.padding,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 50,
  },
  languageText: {
    flex: 1,
    marginLeft: 10,
  },
  activeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
});

export default LanguageSettingsScreen;
