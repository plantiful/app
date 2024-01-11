import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export const LoginScreen = ({ onAuthChange }) => {
  const { t } = i18n;
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation();

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // True because we want to hide the password by default

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthChange(true);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToForgotPassword = () => {
    Alert.alert("Forgot password", "Not implemented yet");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.backButtonContainer}
        onPress={goBack}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        <Text style={styles.backButtonText}>
          {t("LoginScreen_back_button")}
        </Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>{t("LoginScreen_sign_in_text")}</Text>
      <Text style={styles.signInDescription}>
        {t("LoginScreen_sign_in_description")}
      </Text>

      <View style={styles.emailContainer}>
        <Text style={styles.emailInputTitle}>
          {t("LoginScreen_email_input_title")}
        </Text>

        <TextInput
          ref={emailRef}
          style={styles.emailInput}
          keyboardType="email-address"
          returnKeyType="next"
          returnKeyLabel="Next"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.passwordContainer}>
        <Text style={styles.emailInputTitle}>
          {t("LoginScreen_password_input_title")}
        </Text>

        <TextInput
          ref={passwordRef}
          style={styles.passwordInput}
          returnKeyType="done"
          returnKeyLabel="Login"
          secureTextEntry={showPassword}
          onSubmitEditing={handleLogin}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.showPasswordIcon}>
          <TouchableOpacity onPress={toggleShowPassword}>
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color={colors.primary} />
            ) : (
              <Ionicons name="eye" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text style={styles.forgotPasswordTextButton}>
          {t("LoginScreen_forgot_password_text_button")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={[styles.signInButton]}>
        <Text style={styles.signInButtonText}>
          {t("LoginScreen_signin_button")}
        </Text>
      </TouchableOpacity>

      <View style={styles.socialsContainer}>
        <View style={{ paddingBottom: 15 }}>
          <TouchableOpacity style={styles.googleButton}>
            <FontAwesome name="google" size={24} color="black" />
            <Text style={styles.googleButtonText}>
              {t("LoginScreen_google_button")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 15 }}>
          <TouchableOpacity style={styles.facebookButton}>
            <FontAwesome name="facebook" size={24} color="black" />
            <Text style={styles.facebookButtonText}>
              {t("LoginScreen_facebook_button")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 15 }}>
          <TouchableOpacity style={styles.appleButton}>
            <FontAwesome name="apple" size={24} color="black" />
            <Text style={styles.appleButtonText}>
              {t("LoginScreen_apple_button")}
            </Text>
          </TouchableOpacity>
        </View>
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
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: defaultStyles.paddingTop,
  },
  backButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    paddingLeft: defaultStyles.paddingLeft,
  },
  signInText: {
    fontFamily: fonts.bold,
    fontSize: 42,
    color: colors.primary,
    paddingTop: 40,
  },
  signInDescription: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
  emailContainer: {
    paddingTop: 50,
  },
  emailInputTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  emailInput: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#F5F5F5",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  passwordContainer: {
    paddingTop: 20,
  },
  passwordInputTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  passwordInput: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#F5F5F5",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  forgotPasswordTextButton: {
    alignSelf: "flex-end",
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textBlack,
    paddingTop: 15,
    paddingBottom: 15,
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
  socialsContainer: {
    paddingTop: 40,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#ffffff",
    borderColor: colors.primary,
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  googleButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.primary,
    paddingLeft: 10,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#ffffff",
    borderColor: colors.primary,
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  facebookButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.primary,
    paddingLeft: 10,
  },
  appleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#ffffff",
    borderColor: colors.primary,
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  appleButtonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.primary,
    paddingLeft: 10,
  },
});

export default LoginScreen;
