import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, fonts, fontSizes } from "../utils/colors";

type RoundedButtonWithIconProps = {
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: React.ReactNode;
  onPress?: () => void;
  bgColor: string;
  paddingRight?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const RoundedButtonWithIcon: React.FC<RoundedButtonWithIconProps> = ({
  Icon,
  text,
  onPress = () => {},
  bgColor,
  paddingRight = 10,
  style = {},
  textStyle = {},
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: bgColor }, style]}
    onPress={onPress}
  >
    {Icon && (
      <Icon width={24} height={24} style={{ marginRight: paddingRight }} />
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
