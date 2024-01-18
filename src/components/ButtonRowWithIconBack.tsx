import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import * as Icons from "@expo/vector-icons";

interface ButtonRowWithIconBackProps {
  text: string;
  textColor?: string;
  iconSet: keyof typeof Icons;
  iconName: any;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
}

const ButtonRowWithIconBack: React.FC<ButtonRowWithIconBackProps> = ({
  text,
  textColor,
  iconSet,
  iconName,
  iconSize = 24,
  iconColor = "black",
  onPress,
}) => {
  const IconComponent = Icons[iconSet];
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>

      <IconComponent name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: defaultStyles.padding,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: fontSize.large,
    color: colors.textBlack,
    textAlign: "left",
  },
});

export default ButtonRowWithIconBack;
