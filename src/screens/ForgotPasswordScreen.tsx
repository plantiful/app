import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { ForgotPasswordScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonBack from "../components/ButtonBack";
import ButtonWide from "../components/ButtonWide";

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const { t } = i18n;

  const emailRef = useRef<TextInput>(null!);

  const [email, setEmail] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const handleSendEmail = async () => {
    if (!email) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      setShowSuccess(true);
    } catch (error: FirebaseError | any) {
      if (error.code === "auth/invalid-email") {
        setErrorMessage(t("error_invalid_email"));
        setShowError(true);
        return;
      } else if (error.code === "auth/user-disabled") {
        setErrorMessage(t("error_user_disabled"));
        setShowError(true);
        return;
      }
      // User not found not added because it might be a security issue

      // setErrorMessage(error.code);
      setErrorMessage(t("error_unknown"));
      setShowError(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ButtonBack onPress={goBack} />
        <Text style={styles.forgotPasswordText}>
          {t("forgot_password_text")}
        </Text>
        <Text style={styles.forgotPasswordDescription}>
          {t("forgot_password_description")}
        </Text>

        <InputBox
          title={t("email")}
          ref={emailRef}
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleSendEmail}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={{ height: 20 }} />

        <ButtonWide
          text={t("forgot_password_button")}
          onPress={handleSendEmail}
        />

        <ModalConfirm
          title={t("success")}
          text={t("forgot_password_success_text")}
          buttonText={t("forgot_password_success_button")}
          isVisible={showSuccess}
          onClose={() => navigation.navigate("SignIn")}
        />

        <ModalConfirm
          title={t("error")}
          text={errorMessage}
          buttonText={t("try_again")}
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
  forgotPasswordText: {
    fontFamily: fonts.bold,
    fontSize: 41,
    color: colors.primary,
    paddingTop: 40,
  },
  forgotPasswordDescription: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
});

export default ForgotPasswordScreen;
