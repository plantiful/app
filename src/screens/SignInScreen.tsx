import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { SignInScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonShowPassword from "../components/ButtonShowPassword";
import ButtonText from "../components/ButtonText";
import ButtonWideWithIcon from "../components/ButtonWideWithIcon";
import ButtonWide from "../components/ButtonWide";
import ButtonBack from "../components/ButtonBack";

// Icons
import Apple from "../../assets/images/AuthScreen/Apple.svg";
import Google from "../../assets/images/AuthScreen/Google.svg";
import Facebook from "../../assets/images/AuthScreen/Facebook.svg";

export const SignInScreen: React.FC<SignInScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true); // True because we want to hide the password by default

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleSignIn = async () => {
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
      } else if (error.code === "auth/invalid-credential") {
        setErrorMessage(t("error_invalid_login_credentials"));
        setShowError(true);
        return;
      }

      // setErrorMessage(error.code);
      setErrorMessage(t("error_unknown"));
      setShowError(true);
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-230}>
          <ButtonBack onPress={goBack} />

          <Text style={styles.signInText}>{t("sign_in")}</Text>
          <Text style={styles.signInDescription}>
            {t("sign_in_description")}
          </Text>

          <InputBox
            title={t("email")}
            placeholder={t("email_placeholder")}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            onChangeText={(text) => setEmail(text)}
            ref={emailRef}
          />

          <View>
            <InputBox
              title={t("password")}
              placeholder={t("password_placeholder")}
              ref={passwordRef}
              returnKeyType="done"
              secureTextEntry={hidePassword}
              onChangeText={(text) => setPassword(text)}
            />

            <ButtonShowPassword
              color={colors.primary}
              trigger={hidePassword}
              styles={styles.showPasswordIcon}
              onPress={toggleShowPassword}
            />
          </View>

          <ButtonText
            text={t("forgot_password_text_button")}
            fontFamily={fonts.medium}
            fontSize={fontSize.medium}
            alignSelf="flex-end"
            paddingTop={5}
            paddingBottom={20}
            onPress={navigateToForgotPassword}
          />

          <ButtonWide text={t("sign_in")} onPress={handleSignIn} />

          <View style={styles.socialsContainer}>
            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("google_sign_in_button")}
                IconSVG={Google}
                iconSize={20}
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>

            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("facebook_sign_in_button")}
                IconSVG={Facebook}
                iconSize={20}
                paddingLeft={20}
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>

            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("apple_sign_in_button")}
                IconSVG={Apple}
                iconSize={20}
                paddingRight={10}
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

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
    top: 60,
  },
  socialsContainer: {
    paddingTop: 40,
  },
});

export default SignInScreen;
