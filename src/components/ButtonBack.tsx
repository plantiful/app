import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { defaultStyles, fontSize, fonts } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

interface ButtonBackProps {
  color?: string;
  onPress: () => void;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ color, onPress }) => {
  const { t } = i18n;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}
    >
      <MaterialIcons
        name="keyboard-arrow-left"
        size={24}
        color={color === undefined ? "black" : color}
      />
      {/* <Text style={styles.text}>{t("back")}</Text> */}
      <Text style={[styles.text, { color: color }]}>{t("back")}</Text>
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
    paddingLeft: defaultStyles.padding,
  },
});

export default ButtonBack;
