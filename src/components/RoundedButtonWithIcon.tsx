import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, fonts, fontSizes } from "../utils/colors";

import { FontAwesome } from "@expo/vector-icons";

type RoundedButtonWithIconProps = {
  Icon?: keyof typeof FontAwesome.glyphMap;
  IconColor?: string;
  text: React.ReactNode;
  onPress?: () => void;
  bgColor: string;
  paddingRight?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const RoundedButtonWithIcon: React.FC<RoundedButtonWithIconProps> = ({
  Icon,
  IconColor,
  text,
  onPress = () => {},
  bgColor,
  paddingRight = 20,
  style = {},
  textStyle = {},
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: bgColor }, style]}
    onPress={onPress}
  >
    {Icon && (
      <FontAwesome
        name={Icon}
        size={24}
        color={IconColor}
        style={{ paddingRight }}
      />
    )}
    <Text
      style={[
        styles.buttonText,
        bgColor === colors.primary ? styles.whiteText : {},
        textStyle,
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: 50,
    borderRadius: 15,
    marginBottom: 20,
    shadowOpacity: 0.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, // Shadow for Android
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    color: colors.textBlack,
  },
  whiteText: {
    color: colors.textWhite,
  },
});

export default RoundedButtonWithIcon;
