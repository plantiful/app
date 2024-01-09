import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "../../assets/translations/i18n";

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

  const cameraRef = useRef<Camera>(null);

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

  const handleSavePhoto = () => {
    // Implement logic to save the photo
    console.log("Save the photo", capturedImage);
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  const handleDiscardPhoto = () => {
    // Simply discard the photo and hide the preview
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  async function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      setPreviewVisible(true);
      setCapturedImage(photo);
    } else {
      console.log("Camera ref is not set");
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  if (previewVisible && capturedImage) {
    return (
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: capturedImage.uri }}
          style={styles.previewImage}
        />
        <View style={styles.previewButtonContainer}>
          <TouchableOpacity onPress={handleDiscardPhoto}>
            <Ionicons name="close-circle" size={50} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSavePhoto}>
            <Ionicons name="checkmark-circle" size={50} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottonContainer}>
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
          <Ionicons name="flash" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flipCameraButton}
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  backButton: {
    marginLeft: 2,
    marginTop: "15%",
    left: 10,
  },
  bottonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flashButton: {
    marginLeft: 10,
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  flipCameraButton: {
    margin: 10,
    padding: 10,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  previewImage: {
    width: "100%",
    height: "80%",
  },
  previewButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
  },
});

export default CameraScreen;
