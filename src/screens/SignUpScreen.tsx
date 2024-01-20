import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";

// Firebase
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { SignUpScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonShowPassword from "../components/ButtonShowPassword";
import ButtonText from "../components/ButtonText";
import ButtonWide from "../components/ButtonWide";
import ButtonBack from "../components/ButtonBack";

export const SignUpScreen: React.FC<SignUpScreenProps> = ({
  navigation,
  onAuthChange,
}) => {
  const { t } = i18n;

  const nameRef = useRef<TextInput>(null!);
  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true); // True because we want to hide the password by default
  const [isAgreenmentChecked, setAgreenmentChecked] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const openTerms = () => {
    Alert.alert(t("terms_of_use"), t("not_implemented_yet"));
  };

  const openPrivacyPolicy = () => {
    Alert.alert(t("privacy_policy"), t("not_implemented_yet"));
  };

  const handleSignUp = async () => {
    if (!isAgreenmentChecked) {
      setErrorMessage(t("error_agree_terms"));
      setShowError(true);
      return;
    }

    if (!name || !email || !password) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    }

    if (name.length < 3) {
      setErrorMessage(t("error_name_length"));
      setShowError(true);
      return;
    }

    if (password.length < 8) {
      setErrorMessage(t("error_password_length"));
      setShowError(true);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      onAuthChange(true);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(t("error_email_already_in_use"));
        setShowError(true);
        return;
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage(t("error_invalid_email"));
        setShowError(true);
        return;
      }

      setErrorMessage(error.code);
      setShowError(true);
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10}>
          <ButtonBack onPress={goBack} />

          <Text style={styles.signUpText}>{t("sign_up")}</Text>
          <Text style={styles.signUpDescription}>
            {t("sign_up_description")}
          </Text>

          <InputBox
            title={t("name")}
            placeholder={t("name_placeholder")}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            onChangeText={(text) => setName(text)}
            ref={nameRef}
          />

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
              placeholder={t("minimum_8_characters")}
              returnKeyType="done"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={hidePassword}
              ref={passwordRef}
            />

            <ButtonShowPassword
              color={colors.primary}
              trigger={hidePassword}
              styles={styles.showPasswordIcon}
              onPress={toggleShowPassword}
            />
          </View>

          <View style={styles.agreenmentContainer}>
            <Checkbox
              style={styles.agreenmentCheckbox}
              color={isAgreenmentChecked ? colors.primary : undefined}
              value={isAgreenmentChecked}
              onValueChange={setAgreenmentChecked}
            />

            <Text style={styles.agreenmentText}>{t("terms_text1")}</Text>

            <ButtonText
              text={t("terms_of_use")}
              fontFamily={fonts.extraBold}
              fontSize={fontSize.medium}
              onPress={openTerms}
            />
            <Text style={styles.agreenmentText}>{t("terms_text2")}</Text>
            <ButtonText
              text={t("privacy_policy")}
              fontFamily={fonts.extraBold}
              fontSize={fontSize.medium}
              onPress={openPrivacyPolicy}
            />
          </View>

          <ButtonWide
            text={t("sign_up")}
            onPress={handleSignUp}
            disabledTrigger={!isAgreenmentChecked}
          />
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
  signUpText: {
    fontFamily: fonts.bold,
    fontSize: 42,
    color: colors.primary,
    paddingTop: 40,
  },
  signUpDescription: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingTop: 10,
  },
  passwordContainer: {
    paddingTop: defaultStyles.padding,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  agreenmentContainer: {
    flexDirection: "row",
    paddingTop: defaultStyles.padding,
  },
  agreenmentCheckbox: {
    width: 24,
    height: 24,
    borderColor: colors.primary,
    marginRight: 10,
  },
  agreenmentText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    paddingBottom: 30,
  },
});

export default SignUpScreen;
