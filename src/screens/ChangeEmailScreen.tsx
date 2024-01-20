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
import { updateEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { ChangeEmailScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonBack from "../components/ButtonBack";
import ButtonWide from "../components/ButtonWide";

export const ChangeEmailScreen: React.FC<ChangeEmailScreenProps> = ({
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

  const handleChangeEmail = async () => {
    if (!email) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    }

    try {
      await updateEmail(auth.currentUser!, email);

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
        <ButtonBack onPress={goBack} />
        <Text style={styles.titleText}>{t("ChangeEmailScreen_title")}</Text>
        <Text style={styles.descriptionText}>
          {t("ChangeEmailScreen_description")}
        </Text>
        <InputBox
          title={t("email")}
          placeholder={auth.currentUser?.email}
          ref={emailRef}
          returnKeyType="send"
          onSubmitEditing={handleChangeEmail}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={{ height: 20 }} />
        <ButtonWide text={t("confirm")} onPress={handleChangeEmail} />
        <ModalConfirm
          title={t("success")}
          text={t("success_email_changed")}
          buttonText={t("okay")}
          isVisible={showSuccess}
          onClose={() => navigation.navigate("Home")}
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
});

export default ChangeEmailScreen;
