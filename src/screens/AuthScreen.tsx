import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

// SVG icons
import TopRight from "../../assets/images/AuthScreen/TopRight.svg";
import BottomLeft from "../../assets/images/AuthScreen/BottomLeft.svg";

import USFlag from "./../../assets/images/Flags/us.svg";
import CZFlag from "./../../assets/images/Flags/cz.svg";
import SKFlag from "./../../assets/images/Flags/sk.svg";
import ALFlag from "./../../assets/images/Flags/al.svg";

import LanguageSelector from "../components/LanguageSelector";
import RoundedButtonWithIcon from "../components/RoundedButtonWithIcon";
import i18n from "../../assets/translations/i18n";
import { colors, fonts, fontSizes } from "../utils/colors";

type RootStackParamList = {
  Auth: undefined;
  Register: undefined;
  Login: undefined;
} & ParamListBase;

export const AuthScreen = () => {
  const { t } = i18n;
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const languages = [
    { code: "en", flag: USFlag },
    { code: "cs", flag: CZFlag },
    { code: "sk", flag: SKFlag },
    { code: "al", flag: ALFlag },
  ];

  useEffect(() => {
    const changeLanguageListener = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on("languageChanged", changeLanguageListener);
    return () => {
      i18n.off("languageChanged", changeLanguageListener);
    };
  }, []);

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: insets.top,
        }}
      >
        <LanguageSelector
          languages={languages}
          initialLanguage="en"
          style={{ top: 5, left: 35 }}
        />

        <TopRight width={275} height={550} style={styles.topRight} />
        <BottomLeft width={350} height={700} style={styles.bottomLeft} />

        <RoundedButtonWithIcon
          Icon={"apple"}
          text={<Text>{t("AuthScreen_apple_button")}</Text>}
          onPress={null}
          bgColor={colors.background}
        />
        <RoundedButtonWithIcon
          Icon={"google"}
          text={<Text>{t("AuthScreen_google_button")}</Text>}
          onPress={null}
          bgColor={colors.background}
        />
        <RoundedButtonWithIcon
          Icon={"facebook"}
          text={<Text>{t("AuthScreen_facebook_button")}</Text>}
          onPress={null}
          bgColor={colors.background}
          style={{ paddingLeft: 15 }}
        />
        <RoundedButtonWithIcon
          text={<Text>{t("AuthScreen_email_button")}</Text>}
          onPress={navigateToRegister}
          bgColor={colors.primary}
          style={{ borderTopRightRadius: 0 }}
        />

        <View style={styles.line} />
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginButton}>{t("AuthScreen_login_button")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  line: {
    width: 280,
    height: 1,
    borderRadius: 1,
    backgroundColor: colors.textBlack,
    opacity: 0.3,
    top: -7.5,
    marginVertical: 5,
  },
  loginButton: {
    color: colors.textBlack,
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  topRight: {
    position: "absolute",
    top: -50,
    right: -50,
  },
  bottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -95,
  },
});
