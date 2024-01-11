import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import i18n from "../../assets/translations/i18n";
import { colors, fonts, fontSize, defaultStyles } from "../utils/colors";

// SVG icons
import P_SVG from "../../assets/images/AuthScreen/p.svg";
import F_SVG from "../../assets/images/AuthScreen/F.svg";

type RootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
  SignIn: undefined;
} & ParamListBase;

export const AuthScreen = () => {
  const { t } = i18n;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <F_SVG style={styles.fLetter} />
      <P_SVG style={styles.pLetter} />

      <Text style={styles.welcome}>{t("AuthScreen_welcome_text")}</Text>
      <Text style={styles.moto}>{t("AuthScreen_moto_text")}</Text>

      <Text style={styles.signInHeader}>{t("AuthScreen_sign_in_header")}</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.signInButton}
        onPress={navigateToSignIn}
      >
        <Text style={styles.signInButtonText}>
          {t("AuthScreen_sign_in_button")}
        </Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpHeader}>
          {t("AuthScreen_sign_up_header")}
        </Text>
        <TouchableOpacity activeOpacity={0.6} onPress={navigateToSignUp}>
          <Text style={styles.signUpTextButton}>
            {t("AuthScreen_sign_up_text_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.paddingLeft,
  },
  welcome: {
    fontFamily: fonts.bold,
    fontSize: 42,
    color: colors.primary,
    paddingTop: 60,
  },
  moto: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
  signInHeader: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 240,
    paddingBottom: 10,
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
  },
  signInButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textWhite,
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpHeader: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 15,
    paddingRight: 5,
  },
  signUpTextButton: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.primary,
    paddingTop: 15,
  },
  fLetter: {
    position: "absolute",
    top: -0,
    right: -50,
  },
  pLetter: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default AuthScreen;
