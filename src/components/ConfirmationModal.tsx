import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors, fonts, fontSize, defaultStyles } from "../utils/colors";

interface ConfirmationModalProps {
  title: string;
  text: string;
  buttonText: string;
  isVisible: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  text,
  buttonText,
  isVisible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: defaultStyles.paddingLeft,
  },
  modalContainer: {
    alignItems: "center",
    padding: defaultStyles.paddingLeft,
    backgroundColor: colors.background,
    borderRadius: 8,
    shadowOpacity: 0.15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 15,
    elevation: 15,
  },
  modalTitle: {
    fontFamily: fonts.bold,
    fontSize: defaultStyles.paddingLeft,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: 10,
  },
  modalText: {
    fontFamily: fonts.regular,
    fontSize: fontSize.large,
    color: colors.textBlack,
    textAlign: "center",
    paddingBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textWhite,
  },
});

export default ConfirmationModal;
