import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import i18n from "../../assets/translations/i18n";
import { colors, fonts, fontSize, defaultStyles } from "../utils/colors";

// Components
import ButtonWide from "../components/ButtonWide";
import ButtonText from "../components/ButtonText";

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
      <F_SVG style={styles.fLetterSVG} />
      <P_SVG style={styles.pLetterSVG} />

      <Text style={styles.welcomeText}>{t("AuthScreen_welcome_text")}</Text>
      <Text style={styles.welcomeDescription}>
        {t("AuthScreen_description_text")}
      </Text>

      <Text style={styles.signInText}>{t("AuthScreen_sign_in_header")}</Text>

      <ButtonWide
        text={t("AuthScreen_sign_in_button")}
        onPress={navigateToSignIn}
      />

      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text style={styles.signUpText}>{t("AuthScreen_sign_up_header")}</Text>
        <ButtonText
          text={t("AuthScreen_sign_up_text_button")}
          fontFamily={fonts.semiBold}
          fontSize={fontSize.large}
          paddingTop={15}
          onPress={navigateToSignUp}
        />
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
  welcomeText: {
    fontFamily: fonts.bold,
    fontSize: 42,
    color: colors.primary,
    paddingTop: 60,
  },
  welcomeDescription: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
  signInText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 240,
    paddingBottom: 10,
  },
  signUpText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 15,
    paddingRight: 5,
  },
  fLetterSVG: {
    position: "absolute",
    top: -0,
    right: -50,
  },
  pLetterSVG: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default AuthScreen;
