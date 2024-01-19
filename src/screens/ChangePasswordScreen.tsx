import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { auth } from "../firebase";
import { updatePassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { ChangePasswordScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonBack from "../components/ButtonBack";
import ButtonWide from "../components/ButtonWide";
import ButtonShowPassword from "../components/ButtonShowPassword";

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

  const passwordRef = useRef<TextInput>(null!);
  const passwordConfirmRef = useRef<TextInput>(null!);

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [hidePassword, setHidePassword] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
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

  const handleChangePassword = async () => {
    if (!password || !passwordConfirm) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    } else if (password !== passwordConfirm) {
      setErrorMessage(t("error_passwords_dont_match"));
      setShowError(true);
      return;
    } else if (password.length < 8) {
      setErrorMessage(t("error_password_length"));
      setShowError(true);
      return;
    }

    try {
      await updatePassword(auth.currentUser!, password);
      handleSignOut();

      setShowSuccess(true);
    } catch (error: FirebaseError | any) {
      //   setErrorMessage(error.code);
      setErrorMessage(t("error_unknown"));
      setShowError(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10}>
          <ButtonBack onPress={goBack} />
          <Text style={styles.titleText}>
            {t("ChangePasswordScreen_title")}
          </Text>
          <Text style={styles.descriptionText}>
            {t("ChangePasswordScreen_description")}
          </Text>
          <View>
            <InputBox
              title={t("password_input_title")}
              placeholder="********"
              ref={passwordRef}
              returnKeyType="next"
              secureTextEntry={hidePassword}
              onSubmitEditing={() => passwordConfirmRef.current.focus()}
              onChangeText={(text) => setPassword(text)}
              onFocus={() => setFocusedInput("password")}
            />

            {focusedInput === "password" && (
              <ButtonShowPassword
                color={colors.primary}
                trigger={hidePassword}
                styles={styles.showPasswordIcon}
                onPress={toggleShowPassword}
              />
            )}
          </View>

          <View>
            <InputBox
              title={t("password_input_title_confirm")}
              placeholder="********"
              ref={passwordConfirmRef}
              returnKeyType="send"
              secureTextEntry={hidePassword}
              onSubmitEditing={handleChangePassword}
              onChangeText={(text) => setPasswordConfirm(text)}
              onFocus={() => setFocusedInput("passwordConfirm")}
            />

            {focusedInput === "passwordConfirm" && (
              <ButtonShowPassword
                color={colors.primary}
                trigger={hidePassword}
                styles={styles.showPasswordIcon}
                onPress={toggleShowPassword}
              />
            )}
          </View>

          <View style={{ height: 20 }} />
          <ButtonWide
            text={t("ChangePasswordScreen_button_text")}
            onPress={handleChangePassword}
          />
        </KeyboardAvoidingView>

        <ModalConfirm
          title={t("ChangePasswordScreen_success_title")}
          text={t("ChangePasswordScreen_success_text")}
          buttonText={t("ChangePasswordScreen_success_button")}
          isVisible={showSuccess}
          onClose={() => navigation.navigate("Home")}
        />

        <ModalConfirm
          title={t("ChangePasswordScreen_error_title")}
          text={errorMessage}
          buttonText={t("error_button")}
          isVisible={showError}
          onClose={() => setShowError(false)}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.padding,
    paddingTop: defaultStyles.padding,
  },
  titleText: {
    fontFamily: fonts.bold,
    fontSize: 41,
    color: colors.primary,
    paddingTop: 40,
  },
  descriptionText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 20,
    top: 60,
  },
});

export default ChangePasswordScreen;
