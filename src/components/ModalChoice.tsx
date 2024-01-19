import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors, fonts, fontSize, defaultStyles } from "../utils/colors";

interface ModalChoiceProps {
  title: string;
  text: string;
  firstButtonText: string;
  secondButtonText: string;
  isVisible: boolean;
  onFirstButtonPress: () => void;
  onSecondButtonPress: () => void;
}

const ModalChoice: React.FC<ModalChoiceProps> = ({
  title,
  text,
  firstButtonText,
  secondButtonText,
  isVisible,
  onFirstButtonPress,
  onSecondButtonPress,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.button, styles.halfWidth]}
              onPress={onFirstButtonPress}
            >
              <Text style={styles.buttonText}>{firstButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.button, styles.halfWidth]}
              onPress={onSecondButtonPress}
            >
              <Text style={styles.buttonText}>{secondButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: defaultStyles.padding,
  },
  modalContainer: {
    alignItems: "center",
    padding: defaultStyles.padding,
    backgroundColor: colors.background,
    borderRadius: defaultStyles.rounding,
    shadowOpacity: 0.15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    elevation: 15,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: defaultStyles.padding,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: 10,
  },
  modalText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.large,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: defaultStyles.padding,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: defaultStyles.rounding,
  },
  halfWidth: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textWhite,
  },
});

export default ModalChoice;
