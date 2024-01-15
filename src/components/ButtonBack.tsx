import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { defaultStyles, fontSize, fonts } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

interface ButtonBackProps {
  onPress: () => void;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ onPress }) => {
  const { t } = i18n;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}
    >
      <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      <Text style={styles.text}>{t("back_button_text")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    paddingLeft: defaultStyles.paddingLeft,
  },
});

export default ButtonBack;
