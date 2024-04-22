import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  ActivityIndicator,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraType, FlashMode } from "expo-camera";
import axios from "axios";
import { Dimensions } from "react-native";
import { PlantContext } from "./PlantContext";
import { colors, defaultStyles, fontSize, fonts } from "../utils/colors";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "../../assets/translations/i18n";
import { addRoom, addPlantt, PlantInfo, getCurrentUserId } from "../firebase";
import { useLanguage } from "../utils/LanguageContext";

// Components
import ButtonIcon from "../components/ButtonIcon";
import ButtonWide from "../components/ButtonWide";
import { ScanScreenProps } from "../utils/types";


const generateRandomTemperature = () => {
  // Generate a random number between 15 and 24
  let firstNumber = Math.floor(Math.random() * 10) + 18;

  // Decide whether to add or subtract 2 or 3
  let change = Math.random() > 0.5 ? 2 : 3;
  change = Math.random() > 0.5 ? change : -change;

  // Calculate the second number and ensure it is within the 15-24 range
  let secondNumber = firstNumber + change;
  if (secondNumber < 18) {
    secondNumber = firstNumber + Math.abs(change);
  } else if (secondNumber > 24) {
    secondNumber = firstNumber - Math.abs(change);
  }

  // Ensure the smaller number is first
  let smallerNumber = Math.min(firstNumber, secondNumber);
  let largerNumber = Math.max(firstNumber, secondNumber);

  // Return the formatted string
  return `${smallerNumber} - ${largerNumber}`;
};

const generateRandomSunlight = () => {
  // Generate a random number between 60 and 80 that is divisible by 5
  let base = 60; // Starting point, divisible by 5
  let firstNumber = base + Math.floor(Math.random() * 5) * 5; // Increment in steps of 5

  // Possible differences, all divisible by 5
  const differences = [10, 15, 20];
  // Select a random difference
  let difference =
    differences[Math.floor(Math.random() * differences.length)];

  // Decide whether to add or subtract the difference
  let add = Math.random() > 0.5;
  let secondNumber = add
    ? firstNumber + difference
    : firstNumber - difference;

  // Adjust if out of range, ensuring result is still divisible by 5
  if (secondNumber < 60) {
    secondNumber = firstNumber + difference; // This will still be divisible by 5
  } else if (secondNumber > 80) {
    secondNumber = firstNumber - difference; // This will still be divisible by 5
  }

  // Ensure the smaller number is first
  let smallerNumber = Math.min(firstNumber, secondNumber);
  let largerNumber = Math.max(firstNumber, secondNumber);

  // Return the formatted string
  return `${smallerNumber} - ${largerNumber}`;
};



export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
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
  const [useHealthAssessment, setUseHealthAssessment] = useState(false);
  const { addPlant } = useContext(PlantContext);

  const getCameraPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    if (cameraPermission.status === "granted") {
      setCameraPermission(true);
      setIsCameraReady(true);
    } else {
      setCameraPermission(false);
      setIsCameraReady(false);
      Alert.alert("Permission to access camera is required");
    }
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
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

  const toggleFlash = () => {
    setFlash((current) => current === FlashMode.off ? FlashMode.on : FlashMode.off);
  };

  const toggleCameraType = () => {
    setType((current) => current === CameraType.back ? CameraType.front : CameraType.back);
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

  const handleDiscardPhoto = () => {
    setPreviewVisible(false);
    setImage(null);
  };

  const handleSavePhoto = async () => {
    setPreviewVisible(false);
    if (image) {
      await identifyPlant();
    }
    setImage(null);
  };

  const identifyPlant = async () => {
    setLoading(true);
    try {
      var data = JSON.stringify({
        images: [`data:image/jpg;base64,${image.base64}`],
        latitude: 49.207,
        longitude: 16.608,
        similar_images: true,
      });
  
      const config = {
        method: "post",
        url: `https://plant.id/api/v3/${useHealthAssessment ? 'health_assessment' : 'identification'}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=${language}`,
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "3ZMZIOX4tONgD1hL5lsHtYv22LlAuExACIAVkpHHZOBby4qzRw",
        },
        data: data,
      };
  
      const response = await axios(config);
  
      if (useHealthAssessment) {
        const { disease, is_healthy } = response.data.result;
        if (is_healthy.binary) {
          Alert.alert("Health Check", `The plant is healthy. Probability: ${is_healthy.probability.toFixed(2)*100}%`);
        } else {
          const diseaseDetails = disease.suggestions.map(s => 
            `${s.name || 'Unknown disease'} (Probability: ${Math.round((s.probability || 0) * 100)}%)`
          ).join("\n");          
          Alert.alert("Health Check", `The plant is not healthy. Details:\n${diseaseDetails}`);
          console.log(diseaseDetails)
          console.log(JSON.stringify(response.data, null, 2)); // Nicely formatted

        }
      } else {
        const suggestions = response.data.result.classification.suggestions;
        const isPlant = response.data.result.is_plant.binary;
        if (!isPlant) {
          Alert.alert("Identification Error", "No plant identified");
        } else {
          if (suggestions && suggestions.length > 0) {
            const topSuggestion = suggestions[0];
            const plant: PlantInfo = {
              photo: topSuggestion.similar_images[0].url,
              nickname: "",
              commonName: topSuggestion.details.common_names[0],
              scientificName: topSuggestion.name,
              taxonomy: topSuggestion.details.taxonomy,
              rank: topSuggestion.details.rank,
              description: topSuggestion.details.description.value,
              watering: topSuggestion.details.watering ? topSuggestion.details.watering.max : undefined,
              sunlight: generateRandomSunlight(),
              temperature: generateRandomTemperature(),
              lastWatered: Math.floor(Math.random() * 10),
            };
  
            navigation.navigate("PlantScanScreen", {
              plant: plant,
              onDecision: (decision) => {
                if (decision) {
                  const userId = getCurrentUserId();
                  if (userId) {
                    addRoom(userId, "Livin Room")
                      .then((roomId) => {
                        return addPlantt(userId, roomId, plant);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                  } else {
                    console.log("No user is currently logged in");
                  }
                  console.log("Add plant");
                } else {
                  console.log("Discard plant");
                }
              },
            });
          } else {
            Alert.alert("Identification Error", "Suggestions not found");
          }
        }
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("API Error", `Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    );
  }

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
              text={t("Retake")}
              textColor="red"
              onPress={handleDiscardPhoto}
            />
          </View>
          <View style={{ width: defaultStyles.padding }} />
          <View style={{ flex: 1 }}>
            <ButtonWide
              text={t("Use")}
              onPress={handleSavePhoto}
              backgroundColor={colors.primary}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#205950" }}
          thumbColor={useHealthAssessment ? "#ffffff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setUseHealthAssessment}
          value={useHealthAssessment}
        />
      </View>
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
          text={useHealthAssessment ? "Check Health" : "Identify"}
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
  switchContainer: {
    position: 'absolute',
    top: '10%', // Adjusted to move the switch over the camera view
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1, // Ensures the switch is visible above the camera view
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