import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Image } from "react-native";
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
        <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
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

  // Otherwise, show the camera view
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flash} ref={cameraRef}>
        {/* Top Button Container for Flip and Flashlight */}
        <View style={styles.topButtonContainer}>
          <TouchableOpacity style={styles.topButton} onPress={toggleFlash}>
            {/* Flashlight Icon */}
            <Ionicons name="flash" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.topButton} onPress={toggleCameraType}>
            {/* Flip Camera Icon */}
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Bottom Button Container for Taking Picture */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            {/* Take Picture Icon */}
            <Ionicons name="camera" size={50} color="white" />
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
  topButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  bottomButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  topButton: {
    margin: 10,
    padding: 10,
    // Add more styling as needed
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // Add more styling as needed
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  previewImage: {
    width: '100%',
    height: '80%',
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
});

export default CameraScreen;
