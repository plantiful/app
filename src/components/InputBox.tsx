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
  title: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  returnKeyType: ReturnKeyTypeOptions;
  secureTextEntry?: boolean | undefined;
  onSubmitEditing?: () => void | undefined;
  onChangeText: (text: string) => void;
}

// forwardRef due to the onSubmitEditing prop
const InputBox = forwardRef<TextInput, InputBoxProps>(
  (
    {
      title,
      keyboardType,
      returnKeyType,
      secureTextEntry,
      onSubmitEditing,
      onChangeText,
    },
    ref
  ) => {
    return (
      <View style={styles.container}>
        <Text style={styles.inputTitle}>{title}</Text>

        <TextInput
          ref={ref}
          style={styles.input}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    paddingLeft: defaultStyles.paddingLeft,
    backgroundColor: "#F5F5F5",
    borderColor: colors.border,
    borderWidth: 1,
    width: "100%",
    height: 50,
    borderRadius: 8,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
});

export default InputBox;
