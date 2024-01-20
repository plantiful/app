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
import { updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";
import { ChangeNameScreenProps } from "../utils/types";

// Components
import ModalConfirm from "../components/ModalConfirm";
import InputBox from "../components/InputBox";
import ButtonBack from "../components/ButtonBack";
import ButtonWide from "../components/ButtonWide";

export const ChangeNameScreen: React.FC<ChangeNameScreenProps> = ({
  navigation,
}) => {
  const { t } = i18n;

  const displayNameRef = useRef<TextInput>(null!);

  const [displayName, setDisplayName] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigation.goBack();
  };

  const handleChangeDisplayName = async () => {
    if (!displayName) {
      setErrorMessage(t("error_fill_all_fields"));
      setShowError(true);
      return;
    } else if (displayName.length < 3) {
      setErrorMessage(t("error_name_length"));
      setShowError(true);
      return;
    }

    try {
      await updateProfile(auth.currentUser!, {
        displayName: displayName,
      });

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
        <Text style={styles.titleText}>{t("ChangeNameScreen_title")}</Text>
        <Text style={styles.descriptionText}>
          {t("ChangeNameScreen_description")}
        </Text>
        <InputBox
          title={t("name")}
          placeholder={auth.currentUser?.displayName}
          ref={displayNameRef}
          returnKeyType="send"
          onSubmitEditing={handleChangeDisplayName}
          onChangeText={(text) => setDisplayName(text)}
        />
        <View style={{ height: 20 }} />
        <ButtonWide text={t("confirm")} onPress={handleChangeDisplayName} />
        <ModalConfirm
          title={t("success")}
          text={t("success_name_changed")}
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

export default ChangeNameScreen;
