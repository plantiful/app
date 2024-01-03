import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";

import TakePictureButton from "../../assets/images/CameraScreen/TakePictureButton.svg";
import FlashlightButton from "../../assets/images/CameraScreen/FlashLightButton.svg";

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<any>(null);

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

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
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
