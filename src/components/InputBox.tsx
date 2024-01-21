import React, { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
} from "react-native";
import { colors, defaultStyles, fontSize, fonts } from "../utils/colors";

interface InputBoxProps {
  backgroundColor?: string | undefined;
  border?: boolean;
  borderColor?: string | undefined;
  placeholder?: string | undefined;
  placeholderTextColor?: string | undefined;
  title?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType: ReturnKeyTypeOptions;
  secureTextEntry?: boolean | undefined;
  onSubmitEditing?: () => void | undefined;
  onChangeText: (text: string) => void;
  onFocus?: () => void | undefined;
}

// forwardRef due to the onSubmitEditing prop
const InputBox = forwardRef<TextInput, InputBoxProps>(
  (
    {
      border = true,
      borderColor = colors.border,
      backgroundColor = "#F5F5F5",
      placeholder,
      placeholderTextColor = "#B1B1B1",
      title = "",
      keyboardType,
      returnKeyType,
      secureTextEntry,
      onSubmitEditing,
      onChangeText,
      onFocus,
    },
    ref
  ) => {
    return (
      <View style={styles.container}>
        <Text style={styles.inputTitle}>{title}</Text>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onFocus={onFocus}
          ref={ref}
          style={[
            styles.input,
            { backgroundColor },
            border ? [{ borderColor }, { borderWidth: 1 }] : null,
          ]}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: defaultStyles.padding,
  },
  inputTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    paddingBottom: 10,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: defaultStyles.padding,
    width: "100%",
    height: 50,
    borderRadius: defaultStyles.rounding,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
});

export default InputBox;
