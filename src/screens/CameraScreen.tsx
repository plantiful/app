import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";

import { Ionicons } from "@expo/vector-icons";
import i18n from "../../assets/translations/i18n";

import TakePictureButton from "../../assets/images/CameraScreen/TakePictureButton.svg";
import FlashlightButton from "../../assets/images/CameraScreen/FlashLightButton.svg";
import { useNavigation } from "@react-navigation/native";
import { fontSizes, fonts } from "../utils/colors";

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);
  const navigation = useNavigation();
  const { t } = i18n;

  let camera: Camera;

  if (!permission) {
    requestPermission().then((permission) => {
      if (!permission) {
        Alert.alert("Permission to access camera is required!");
      }
    });
    return null;
  }

  if (!permission.granted) {
    Alert.alert("Permission to access camera is required!");
    return null;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function takePicture() {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <Text style={styles.text}>Flash</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: 'baseline',
    marginLeft: 2,
    marginTop: "15%",
  },
  backButtonText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.medium,
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default CameraScreen;
