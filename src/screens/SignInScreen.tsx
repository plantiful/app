import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Components
import ConfirmationModal from "../components/ConfirmationModal";
import InputBox from "../components/InputBox";
import ShowPasswordButton from "../components/ShowPasswordButton";

// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";

export const SignInScreen = ({ onAuthChange }) => {
  const { t } = i18n;
  const navigation = useNavigation();

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true); // True because we want to hide the password by default

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  async function handleSignIn() {
    if (!email || !password) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthChange(true);
    } catch (error: FirebaseError | any) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage(t("error_invalid_email"));
        setShowError(true);
        return;
      } else if (error.code === "auth/user-disabled") {
        setErrorMessage(t("error_user_disabled"));
        setShowError(true);
        return;
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage(t("error_user_not_found"));
        setShowError(true);
        return;
      } else if (error.code === "auth/invalid-login-credentials") {
        setErrorMessage(t("error_invalid_login_credentials"));
        setShowError(true);
        return;
      }

      setErrorMessage(error.code);
      setShowError(true);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-230}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.backButtonContainer}
            onPress={goBack}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
            <Text style={styles.backButtonText}>{t("back_button")}</Text>
          </TouchableOpacity>

          <Text style={styles.signInText}>{t("sign_in_text")}</Text>
          <Text style={styles.signInDescription}>
            {t("sign_in_description")}
          </Text>

          <InputBox
            title={t("email_input_title")}
            ref={emailRef}
            keyboardType="email-address"
            returnKeyType="next"
            returnKeyLabel="Next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={(text) => setEmail(text)}
          />

          <View>
            <InputBox
              title={t("password_input_title")}
              ref={passwordRef}
              returnKeyType="done"
              returnKeyLabel="Done"
              onChangeText={(text) => setPassword(text)}
            />

            <ShowPasswordButton
              activeOpacity={0.6}
              color={colors.primary}
              trigger={hidePassword}
              styles={styles.showPasswordIcon}
              onPress={toggleShowPassword}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={navigateToForgotPassword}
          >
            <Text style={styles.forgotPasswordTextButton}>
              {t("forgot_password_text_button")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSignIn}
            style={[styles.signInButton]}
          >
            <Text style={styles.signInButtonText}>
              {t("sign_in_button_text")}
            </Text>
          </TouchableOpacity>

          <View style={styles.socialsContainer}>
            <View style={{ paddingBottom: 15 }}>
              <TouchableOpacity activeOpacity={0.6} style={styles.googleButton}>
                <FontAwesome name="google" size={24} color="black" />
                <Text style={styles.googleButtonText}>
                  {t("google_sign_in_button")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 15 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.facebookButton}
              >
                <FontAwesome name="facebook" size={24} color="black" />
                <Text style={styles.facebookButtonText}>
                  {t("facebook_sign_in_button")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 15 }}>
              <TouchableOpacity activeOpacity={0.6} style={styles.appleButton}>
                <FontAwesome name="apple" size={24} color="black" />
                <Text style={styles.appleButtonText}>
                  {t("apple_sign_in_button")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <ConfirmationModal
        title={t("sign_in_error_title")}
        text={errorMessage}
        buttonText={t("error_button")}
        isVisible={showError}
        onClose={() => setShowError(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.paddingLeft,
    paddingTop: defaultStyles.paddingTop,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  showPasswordIcon: {
    position: "absolute",
    right: 20,
    top: 80,
  },
  forgotPasswordTextButton: {
    alignSelf: "flex-end",
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.primary,
    paddingTop: 5,
    paddingBottom: 20,
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.background,
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

export default SignInScreen;
