import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Image,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState("");
  const navigation = useNavigation();
  const cameraRef = useRef(null);

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

    if (capturedImage) {
      identifyPlant(capturedImage);
    }

    setCapturedImage(null);
  };

  const handleDiscardPhoto = () => {
    // Simply discard the photo and hide the preview
    setPreviewVisible(false);
    setCapturedImage(null);
  };

  async function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  }

  async function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const identifyPlant = async (capturedImg) => {
    if (!capturedImg || !capturedImg.uri) {
      console.log("No image captured");
      return;
    }

    // Convert the image to a base64 string
    const base64 = await FileSystem.readAsStringAsync(capturedImg.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      const payload = {
        images: [base64], // The API expects a list of base64 strings
        // include any other required fields according to the API documentation
      };

      const apiResponse = await axios.post(
        "https://api.plant.id/v2/identify",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Api-Key": "gnIHsLsak4YTHqvM9BHF5MIsx5mSzwIItY2KkeLAZJBJYl87wh",
          },
        }
      );

      console.log("API Response:", apiResponse.data);

      const suggestions = apiResponse.data.suggestions;
      const isPlant = apiResponse.data.is_plant;

      if (isPlant === false) {
        Alert.alert("No plant identified");
      } else {
        if (suggestions && suggestions.length > 0) {
          const topSuggestion = suggestions[0];
          const plantName = topSuggestion.plant_name;
          const probability = topSuggestion.probability;

          setIdentifiedPlant(plantName);

          Alert.alert(
            "Plant Identified",
            `Name: ${plantName}, Probability: ${(probability * 100).toFixed(
              2
            )}%`
          );
        } else {
          Alert.alert("No plant identified");
        }
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
        console.log("Error Response Headers:", error.response.headers);
        Alert.alert(
          "API Error",
          `Error: ${
            error.response.data.message || "Failed to identify the plant."
          }`
        );
      } else if (error.request) {
        console.log("Error Request:", error.request);
        Alert.alert("API Error", "No response received from the API.");
      } else {
        console.log("Error", error.message);
        Alert.alert("API Error", `Error: ${error.message}`);
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPreviewVisible(true);
      setCapturedImage(photo);
    } else {
      console.log("Camera ref is not set");
    }
  };

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

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
          {flash === FlashMode.on ? (
            <Ionicons name="flash" size={36} color="white" />
          ) : (
            <Ionicons name="flash-off" size={36} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture} />

        <TouchableOpacity
          style={styles.flipCameraButton}
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse" size={36} color="white" />
        </TouchableOpacity>
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
  bottomContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  flashButton: {
    paddingRight: 50,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  flipCameraButton: {
    paddingLeft: 50,
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
