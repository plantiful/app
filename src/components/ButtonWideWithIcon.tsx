import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import {
  colors,
  fonts,
  fontSize as defaultFontSize,
  defaultStyles,
} from "../utils/colors";

interface ButtonWideWithIconProps {
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  text: string;
  textColor?: string;
  paddingLeft?: number;
  paddingRight?: number;
  IconSVG?: React.FC<SvgProps>;
  iconSize?: number;
  iconColor?: string;
  disabledTrigger?: boolean;
  notImplemented?: boolean;
  onPress?: () => void;
}

const ButtonWideWithIcon: React.FC<ButtonWideWithIconProps> = ({
  backgroundColor = colors.background,
  border = false,
  borderColor = colors.primary,
  fontFamily = fonts.semiBold,
  fontSize = defaultFontSize.large,
  text,
  textColor = colors.primary,
  paddingLeft = 0,
  paddingRight = 0,
  IconSVG,
  iconSize = 24,
  iconColor = "black",
  disabledTrigger = false,
  notImplemented = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={notImplemented}
      style={[
        styles.button,
        {
          backgroundColor: border ? "transparent" : backgroundColor,
          borderColor: border ? borderColor : "transparent",
          borderWidth: border ? 1 : 0,
          opacity: disabledTrigger ? 0.6 : 1,
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
        },
      ]}
    >
      {IconSVG && (
        <IconSVG width={iconSize} height={iconSize} fill={iconColor} />
      )}
      <Text
        style={[
          {
            fontFamily,
            fontSize,
            color: textColor,
            paddingLeft: 10,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: defaultStyles.rounding,
  },
});

export default ButtonWideWithIcon;
