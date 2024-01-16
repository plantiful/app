import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors, defaultStyles } from "../utils/colors";
import * as Icons from "@expo/vector-icons";

interface ButtonIconProps {
  iconSet: keyof typeof Icons;
  backgroundColor?: string;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  disabledTrigger?: boolean;
  notImplemented?: boolean;
  onPress?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  backgroundColor = colors.background,
  iconSet,
  iconName,
  iconSize = 24,
  iconColor = "black",
  disabledTrigger = false,
  notImplemented = false,
  onPress,
}) => {
  const IconComponent = Icons[iconSet];

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
      <IconComponent name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultStyles.rounding,
    paddingHorizontal: defaultStyles.padding,
  },
});

export default ButtonIcon;
