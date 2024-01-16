import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { colors, defaultStyles } from "../utils/colors";

import { Ionicons } from "@expo/vector-icons";

interface ButtonIconProps {
  backgroundColor?: string;
  iconName: any;
  iconSize?: number;
  iconColor?: string;
  disabledTrigger?: boolean;
  notImplemented?: boolean;
  onPress?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  backgroundColor = colors.background,
  iconName,
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
          backgroundColor: backgroundColor,
          opacity: disabledTrigger ? 0.6 : 1,
        },
      ]}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultStyles.rouding,
    paddingHorizontal: defaultStyles.padding,
  },
});

export default ButtonIcon;
