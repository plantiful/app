import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import axios from "axios";
import * as FileSystem from "expo-file-system";

import { colors, defaultStyles } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Components
import ButtonBack from "../components/ButtonBack";
import ButtonIcon from "../components/ButtonIcon";
import ButtonWide from "../components/ButtonWide";

import { Ionicons } from "@expo/vector-icons";

export const ScanScreen = () => {
  const { t } = i18n;

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState("");
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const [supportedRatios, setSupportedRatios] = useState([]);
  const selectedRatio = supportedRatios.length > 0 ? supportedRatios[0] : "4:3";

  useEffect(() => {
    const fetchSupportedRatios = async () => {
      if (cameraRef.current) {
        const ratios = await cameraRef.current.getSupportedRatiosAsync();
        setSupportedRatios(ratios);
      }
    };

    fetchSupportedRatios();
  }, []);

  if (!permission) {
    requestPermission().then((permission) => {
      if (!permission) {
        Alert.alert("Permission to access camera is required!");
      }
    });
    return null;
  }

  const handleSavePhoto = () => {
    // console.log("Save the photo", capturedImage);
    console.log(supportedRatios);
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

  async function identifyPlant(capturedImg: { uri: string }) {
    if (!capturedImg || !capturedImg.uri) {
      console.log("No image captured");
      return;
    }

    try {
      var data = JSON.stringify({
        images: [`data:image/jpg;base64,${capturedImage.base64}`], // Using ` because of the ${} syntax
        latitude: 49.207,
        longitude: 16.608,
        similar_images: true,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://plant.id/api/v3/identification",
        headers: {
          "Api-Key": "qaWgnZVMw5FqXSgo7sdTWsWD6PCLuSs62JIHjEXmEq1TqxhLt8",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const apiResponse = await axios(config);

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
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
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
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <ButtonBack color={"white"} onPress={goBack} />
      </Camera>

      <View style={styles.cameraButtonsContainer}>
        <ButtonIcon
          backgroundColor={colors.primary}
          iconName={flash === FlashMode.on ? "flash" : "flash-off"}
          iconColor="white"
          onPress={toggleFlash}
        />

        <View style={{ flex: 1 }}>
          <ButtonWide text={t("scan")} onPress={takePicture} />
        </View>

        <ButtonIcon
          backgroundColor={colors.primary}
          iconName={type === CameraType.back ? "camera-reverse" : "camera"}
          iconColor="white"
          onPress={toggleCameraType}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  camera: {
    flex: 1,
    paddingHorizontal: defaultStyles.paddingLeft,
    paddingTop: defaultStyles.paddingTop,
  },
  cameraButtonsContainer: {
    flexDirection: "row",
    paddingTop: 20,
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

export default ScanScreen;
