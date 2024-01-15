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
import { StackNavigationProp } from "@react-navigation/stack";

// Firebase
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { AuthStackParamList } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonShowPassword from "../components/ButtonShowPassword";
import ButtonText from "../components/ButtonText";
import ButtonWideWithIcon from "../components/ButtonWideWithIcon";
import ButtonWide from "../components/ButtonWide";
import ButtonBack from "../components/ButtonBack";

type SignInScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

type SignInScreenProps = {
  navigation: SignInScreenNavigationProp;
  onAuthChange: (status: boolean) => void;
};

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

      // setErrorMessage(error.code);
      setErrorMessage(t("error_unknown"));
      setShowError(true);
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-230}>
          <ButtonBack onPress={goBack} />

          <Text style={styles.signInText}>{t("sign_in_text")}</Text>
          <Text style={styles.signInDescription}>
            {t("sign_in_description")}
          </Text>

          <InputBox
            title={t("email_input_title")}
            ref={emailRef}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            onChangeText={(text) => setEmail(text)}
          />

          <View>
            <InputBox
              title={t("password_input_title")}
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

          <ButtonWide text={t("sign_in_button_text")} onPress={handleSignIn} />

          <View style={styles.socialsContainer}>
            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("google_sign_in_button")}
                iconName="google"
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>

            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("facebook_sign_in_button")}
                iconName="facebook"
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>

            <View style={{ paddingBottom: 15 }}>
              <ButtonWideWithIcon
                border={true}
                text={t("apple_sign_in_button")}
                iconName="apple"
                disabledTrigger={true}
                notImplemented={true}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <ModalConfirm
          title={t("sign_in_error_title")}
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
    paddingHorizontal: defaultStyles.paddingLeft,
    paddingTop: defaultStyles.paddingTop,
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
