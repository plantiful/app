import React from "react";
import { TouchableOpacity, Text, FlexAlignType } from "react-native";
import { colors } from "../utils/colors";

interface ButtonTextProps {
  text: string;
  textColor?: string;
  fontFamily: string;
  fontSize: number;
  alignSelf?: FlexAlignType;
  paddingTop?: number;
  paddingBottom?: number;
  disabledTrigger?: boolean;
  notImplemented?: boolean;
  onPress: () => void;
}

const ButtonText: React.FC<ButtonTextProps> = ({
  text,
  textColor = colors.primary,
  fontFamily,
  fontSize,
  alignSelf = "flex-start",
  paddingTop = 0,
  paddingBottom = 0,
  disabledTrigger = false,
  notImplemented = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[{ alignSelf, paddingTop, paddingBottom }]}
      disabled={notImplemented}
      onPress={onPress}
    >
      <Text
        style={[
          {
            color: textColor,
            fontFamily,
            fontSize,
            opacity: disabledTrigger ? 0.6 : 1,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
