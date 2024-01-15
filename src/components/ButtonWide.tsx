import React from "react";
import { TouchableOpacity, Text, StyleSheet, FlexStyle } from "react-native";
import { colors, fonts, fontSize } from "../utils/colors";

interface ButtonWideProps {
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  text: string;
  textColor?: string;
  disabledTrigger?: boolean;
  notImplemented?: boolean;
  onPress: () => void;
}

const ButtonWide: React.FC<ButtonWideProps> = ({
  backgroundColor = colors.primary,
  border = false,
  borderColor = colors.primary,
  text,
  textColor = colors.textWhite,
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
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            opacity: disabledTrigger ? 0.6 : 1,
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
  },
});

export default ButtonWide;
