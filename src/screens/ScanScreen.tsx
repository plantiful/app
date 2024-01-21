import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType, FlashMode } from "expo-camera";
import axios from "axios";
import { Dimensions } from "react-native";
import { PlantContext, Plant } from "./PlantContext";
import { colors, defaultStyles, fontSize, fonts } from "../utils/colors";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "../../assets/translations/i18n";

import { useLanguage } from "../utils/LanguageContext";

// Components
import ButtonIcon from "../components/ButtonIcon";
import ButtonWide from "../components/ButtonWide";

export const ScanScreen = () => {
  const { t } = i18n;

  const { language } = useLanguage();

  const [camera, setCamera] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const [image, setImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [key, setKey] = useState(Math.random().toString());

  const [loading, setLoading] = useState(false);

  const { addPlant } = useContext(PlantContext);

  async function getCameraPermission() {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status === "granted") {
      setCameraPermission(true);
      setIsCameraReady(true);
    } else {
      setCameraPermission(false);
      setIsCameraReady(false);
      Alert.alert("Permission to access camera is required");
    }
  }

  useEffect(() => {
    getCameraPermission();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const setupCamera = async () => {
        if (isActive) {
          setIsCameraReady(false);
          await getCameraPermission();
        }
      };

      setupCamera();
      setKey(Math.random().toString()); // Change key to force remount

      return () => {
        isActive = false;
      };
    }, [])
  );

  const toggleFlash = async () => {
    setFlash((current) =>
      current === FlashMode.off ? FlashMode.on : FlashMode.off
    );
  };

  const takePicture = async () => {
    if (camera && isCameraReady) {
      const data = await camera.takePictureAsync({
        base64: true,
        skipProcessing: true,
      });

      const screenWidth = Dimensions.get("window").width;
      const aspectRatio = data.width / data.height;
      const scaledHeight = screenWidth / aspectRatio;

      const imageObject = {
        uri: data.uri,
        base64: data.base64,
        width: screenWidth,
        height: scaledHeight,
        transform: type === CameraType.front ? [{ scaleX: -1 }] : [],
      };

      setImage(imageObject);
      setPreviewVisible(true);
    } else {
      console.log("Camera is not ready or camera ref is not set");
    }
  };

  const toggleCameraType = async () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleDiscardPhoto = () => {
    setPreviewVisible(false);
    setImage(null);
  };

  const handleSavePhoto = () => {
    setPreviewVisible(false);

    if (image) {
      identifyPlant();
    }

    setImage(null);
  };

  const identifyPlant = async () => {
    setLoading(true);
    try {
      var data = JSON.stringify({
        images: [`data:image/jpg;base64,${image.base64}`], // Using ` because of the ${} syntax
        latitude: 49.207,
        longitude: 16.608,
        similar_images: true,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=${language}`,
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "qaWgnZVMw5FqXSgo7sdTWsWD6PCLuSs62JIHjEXmEq1TqxhLt8",
        },
        data: data,
      };

      const apiResponse = await axios(config);

      console.log("API Response:", apiResponse.data);

      const suggestions = apiResponse.data.result.classification.suggestions;
      const isPlant = apiResponse.data.result.is_plant.binary;

      if (!isPlant) {
        Alert.alert("No plant identified");
      } else {
        if (suggestions && suggestions.length > 0) {
          suggestions.forEach((suggestion: any, index: number) => {
            console.log(`Suggestion ${index + 1}:`, suggestion);
          });

          const topSuggestion = suggestions[0];
          const plantName = topSuggestion.details.common_names[0];
          const probability = topSuggestion.probability;
          const plantDescription = topSuggestion.details.description.value;
          const plantClass = topSuggestion.details.taxonomy.class;
          const plantGenus = topSuggestion.details.taxonomy.genus;
          const plantOrder = topSuggestion.details.taxonomy.order;
          const plantFamily = topSuggestion.details.taxonomy.family;
          const plantPhylum = topSuggestion.details.taxonomy.phylum;
          const plantKingdom = topSuggestion.details.taxonomy.kingdom;
          const plantSunlight = "Not implemented.";
          const plantTemperature = "Not implemented.";
          const plantOrigin = "Not implemented.";
          const plantGrowthHabit = "Not implemented.";
          // leaving the variables as not implement, Valon can fix later

          let plantWateringMin = "Not available.";
          let plantWateringMax = "Not available.";
          let plantWatering = "Not available.";

          const plantData: Plant = {
            id: Math.floor(Math.random() * 1000000),
            name: plantName,
            description: plantDescription,
            imageUrl: topSuggestion.similar_images[0].url,
            watering: plantWatering,
            sunlight: plantSunlight,
            temperature: plantTemperature,
            origin: plantOrigin,
            family: plantFamily,
            growthHabit: plantGrowthHabit,
          };

          if (topSuggestion.details.watering !== null) {
            plantWatering = topSuggestion.details.watering['max'];
            //plantWateringMin = topSuggestion.details.watering.min;
            //plantWateringMax = topSuggestion.details.watering.max;
          }

          let plantSynonyms = "";

          if (
            topSuggestion.details.synonyms &&
            topSuggestion.details.synonyms.length > 0
          ) {
            // Get up to the first three synonyms
            plantSynonyms = topSuggestion.details.synonyms
              .slice(0, 3)
              .join(", ");
          } else {
            plantSynonyms = topSuggestion.details.synonyms[0];
          }

          addPlant(plantData);
          console.log("Added plant", plantData);

          console.log(plantDescription);
          console.log(plantClass);
          console.log(plantGenus);
          console.log(plantOrder);
          console.log(plantFamily);
          console.log(plantPhylum);
          console.log(plantKingdom);
          console.log(plantSynonyms);
          console.log(plantWateringMin);
          console.log(plantWateringMax);
          console.log(plantWatering);

          Alert.alert(
            "Plant Identified",
            `Name: ${plantName}, Probability: ${(probability * 100).toFixed(
              2
            )}%`
          );
        } else {
          Alert.alert("Suggestions not found");
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
    } finally {
      setLoading(false);
    }
  };

  if (previewVisible && image) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={{
            width: image.width,
            height: image.height,
            transform: image.transform,
          }}
          source={{ uri: image.uri }}
        />

        <View style={{ height: defaultStyles.padding }} />

        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            <ButtonWide
              border={true}
              borderColor={"red"}
              text={t("ScanScreen_retake_button_text")}
              textColor="red"
              onPress={handleDiscardPhoto}
            />
          </View>

          <View style={{ width: defaultStyles.padding }} />

          <View style={{ flex: 1 }}>
            <ButtonWide
              text={t("ScanScreen_use_button_text")}
              onPress={handleSavePhoto}
              backgroundColor={colors.primary}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Your component content */}

        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        flashMode={flash}
        ref={setCamera}
        onCameraReady={() => setIsCameraReady(true)}
        key={key}
      />

      <View style={{ height: defaultStyles.padding }} />

      <View style={styles.bottomContainer}>
        <ButtonIcon
          iconSet="Ionicons"
          backgroundColor={colors.primary}
          iconName={flash === FlashMode.on ? "flash" : "flash-off"}
          iconColor="white"
          onPress={toggleFlash}
        />

        <View style={{ flex: 1, paddingHorizontal: defaultStyles.padding }}>
          <ButtonWide
            text={t("ScanScreen_idenitfy_button_text")}
            onPress={takePicture}
          />
        </View>

        <ButtonIcon
          iconSet="Ionicons"
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
  bottomContainer: {
    flexDirection: "row",
    paddingHorizontal: defaultStyles.padding,
  },
  text: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
});

export default ScanScreen;
