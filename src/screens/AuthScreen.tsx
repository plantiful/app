import React, { useEffect, useState, SVGAttributes } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

// SVG icons
import Apple from "../../assets/images/AuthScreen/Apple.svg";
import Google from "../../assets/images/AuthScreen/Google.svg";
import Facebook from "../../assets/images/AuthScreen/Facebook.svg";
import TopRight from "../../assets/images/AuthScreen/TopRight.svg";
import BottomLeft from "../../assets/images/AuthScreen/BottomLeft.svg";

import { RootStackParamList } from "../utils/types";
import LanguageSelector from "../components/LanguageSelector";
import i18n from "../../assets/translations/i18n";
import { colors, fonts, fontSizes } from "../utils/colors";

export const AuthScreen = () => {
  const { t } = i18n;
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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

  const renderButton = (
    Icon: React.FunctionComponent<SVGAttributes<SVGElement>> | null,
    text: React.ReactNode,
    onPress: (() => void) | null = null,
    bgColor: string,
    paddingRight: number = 10,
    style: object = {}
  ) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, style]}
      onPress={onPress || (() => {})}
    >
      {Icon && (
        <Icon width={24} height={24} style={{ marginRight: paddingRight }} />
      )}
      <Text
        style={[
          styles.buttonText,
          bgColor === colors.primary ? styles.whiteText : {},
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

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
        <LanguageSelector />

        <TopRight width={275} height={550} style={styles.topRight} />
        <BottomLeft width={350} height={700} style={styles.bottomLeft} />

        {renderButton(
          Apple,
          <Text>{t("AuthScreen_apple_button")}</Text>,
          null,
          colors.background
        )}
        {renderButton(
          Google,
          <Text>{t("AuthScreen_google_button")}</Text>,
          null,
          colors.background
        )}
        {renderButton(
          Facebook,
          <Text>{t("AuthScreen_facebook_button")}</Text>,
          null,
          colors.background,
          5
        )}
        {renderButton(
          null,
          <Text>{t("AuthScreen_email_button")}</Text>,
          navigateToRegister,
          colors.primary,
          10,
          { borderTopRightRadius: 0 }
        )}

        <View style={styles.line} />
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.textButton}>{t("AuthScreen_login_button")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 3,
  },
  buttonText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
  },
  whiteText: {
    color: colors.textWhite,
  },
  line: {
    width: 280,
    height: 1,
    borderRadius: 1,
    backgroundColor: colors.textBlack,
    opacity: 0.3,
    top: -7.5,
    marginVertical: 5,
  },
  textButton: {
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
