import React, { useRef, useState } from "react";
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
import Checkbox from "expo-checkbox";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonShowPassword from "../components/ButtonShowPassword";
import ButtonText from "../components/ButtonText";
import ButtonWide from "../components/ButtonWide";

// Firebase
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// Icons
import { MaterialIcons } from "@expo/vector-icons";

export const SignUpScreen = ({ onAuthChange }) => {
  const { t } = i18n;
  const navigation = useNavigation();

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

  const toggleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const openTerms = () => {
    Alert.alert("Terms", "Not implemented yet");
  };

  const openPrivacyPolicy = () => {
    Alert.alert("Privacy policy", "Not implemented yet");
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    }

    if (!isAgreenmentChecked) {
      setErrorMessage(t("error_agree_terms"));
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

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.backButtonContainer}
            onPress={goBack}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
            <Text style={styles.backButtonText}>{t("back_button")}</Text>
          </TouchableOpacity>

          <Text style={styles.signUpText}>{t("sign_up_text")}</Text>
          <Text style={styles.signUpDescription}>
            {t("sign_up_description")}
          </Text>

          <InputBox
            title={t("name_input_title")}
            ref={nameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            onChangeText={(text) => setName(text)}
          />

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

          <View style={styles.agreenmentContainer}>
            <Checkbox
              style={styles.agreenmentCheckbox}
              color={isAgreenmentChecked ? colors.primary : undefined}
              value={isAgreenmentChecked}
              onValueChange={setAgreenmentChecked}
            />

            <Text style={styles.agreenmentText}>{t("terms_text1")}</Text>

            <ButtonText
              text={t("terms_button_text")}
              fontFamily={fonts.extraBold}
              fontSize={fontSize.medium}
              onPress={openTerms}
            />
            <Text style={styles.agreenmentText}>{t("terms_text2")}</Text>
            <ButtonText
              text={t("privacy_policy_button_text")}
              fontFamily={fonts.extraBold}
              fontSize={fontSize.medium}
              onPress={openPrivacyPolicy}
            />
          </View>

          <ButtonWide
            text={t("sign_up_button")}
            onPress={handleSignUp}
            disabledTrigger={!isAgreenmentChecked}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <ModalConfirm
        title={t("sign_up_error_title")}
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
    paddingTop: 20,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  agreenmentContainer: {
    flexDirection: "row",
    paddingTop: 20,
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
