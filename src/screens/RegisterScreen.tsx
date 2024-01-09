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

import { colors, fonts, fontSizes } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Ionicons } from "@expo/vector-icons";

// SVG icons
import Plant from "../../assets/images/RegisterScreen/Plant.svg";

export const RegisterScreen = ({ onAuthChange }) => {
  const { t } = i18n;
  const windowHeight = useWindowDimensions().height;
  const navigation = useNavigation();

  const emailRef = useRef<TextInput>(null!);
  const passwordRef = useRef<TextInput>(null!);
  const confirmPasswordRef = useRef<TextInput>(null!);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // True because we want to hide the password by default

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderShowPasswordIcon = (isFocused: boolean) => {
    if (!isFocused) return null;
    return (
      <TouchableOpacity onPress={toggleShowPassword}>
        {showPassword ? (
          <Ionicons name="eye-off" size={24} color={colors.textBlack} />
        ) : (
          <Ionicons name="eye" size={24} color={colors.textBlack} />
        )}
      </TouchableOpacity>
    );
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthChange(true);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { minHeight: Math.round(windowHeight) }]}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>
            {t("RegisterScreen_back_button")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("RegisterScreen_name_input") as string}
          placeholderTextColor={colors.textBlack + "66"}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder={t("RegisterScreen_email_input") as string}
          placeholderTextColor={colors.textBlack + "66"}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.input}>
          <TextInput
            ref={passwordRef}
            secureTextEntry={showPassword}
            placeholder={t("RegisterScreen_password_input") as string}
            placeholderTextColor={colors.textBlack + "66"}
            returnKeyType="next"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.showPasswordIcon}>
            {renderShowPasswordIcon(isPasswordFocused)}
          </View>
        </View>

        <View style={styles.input}>
          <TextInput
            ref={confirmPasswordRef}
            secureTextEntry={showPassword}
            placeholder={t("RegisterScreen_password_repeat_input") as string}
            placeholderTextColor={colors.textBlack + "66"}
            returnKeyType="go"
            onFocus={() => setIsConfirmPasswordFocused(true)}
            onBlur={() => setIsConfirmPasswordFocused(false)}
            onSubmitEditing={handleRegister}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View style={styles.showPasswordIcon}>
            {renderShowPasswordIcon(isConfirmPasswordFocused)}
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Plant width={100} height={100} style={styles.plant} />
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>
            {t("RegisterScreen_register_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginTop: "5%",
  },
  backButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginLeft: 10,
  },
  inputContainer: {
    flex: 1.1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  input: {
    width: "80%",
    height: 40,
    borderBottomWidth: 1,
    borderColor: colors.textBlack + "4D",
    marginBottom: 20,
    fontFamily: fonts.regular,
    fontSize: fontSizes.large,
    color: colors.textBlack,
  },
  bottomContainer: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  plant: {
    marginBottom: -10,
  },
  registerButton: {
    width: "80%",
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderTopRightRadius: 0,
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.large,
    color: colors.textWhite,
  },
  showPasswordIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default RegisterScreen;
