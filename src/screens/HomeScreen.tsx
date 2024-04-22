import React, { useContext, useEffect, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../../assets/translations/i18n";
import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";

// Firebase
import {
  auth,
  getCurrentUserId,
  getPlantsInRoom,
  getWateringHistory,
  PlantInfo,
  WateringEvent,
} from "../firebase";

// Components
import { Ionicons } from "@expo/vector-icons";
import {
  Calendar,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import ButtonIcon from "../components/ButtonIcon";
import ButtonText from "../components/ButtonText";
import ModalConfirm from "../components/ModalConfirm";
import { useLanguage } from "../utils/LanguageContext";
import { HomeScreenProps } from "../utils/types";
import PlantContext from "./PlantContext";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { t } = i18n;

  interface PlantInfoWithRoom extends PlantInfo {
    roomName: string;
  }

  useEffect(() => {
    // checkEmailVerification();

    Animated.timing(progress, {
      toValue: 75,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  }, [language]);

  const checkEmailVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified === false) {
      setShowEmailConfirmation(true);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const [wateringHistory, setWateringHistory] = useState<WateringEvent[]>([]);
  const [dailyPercentage, setDailyPercentage] = useState(0);

  const { plants, rooms } = useContext(PlantContext);

  const [allPlants, setAllPlants] = useState<PlantInfoWithRoom[]>([]);

  useEffect(() => {
    const fetchPlantsForAllRooms = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const roomPlants = await Promise.all(
          rooms.map(async (room) => {
            const fetchedPlants: PlantInfoWithRoom[] = await getPlantsInRoom(
              userId,
              room.id
            );
            return fetchedPlants.map((plant) => ({
              ...plant,
              roomName: room.name,
            }));
          })
        );
        const flattenedPlants: PlantInfoWithRoom[] = roomPlants.flat();
        setAllPlants(flattenedPlants);
      }
    };

    fetchPlantsForAllRooms();
  }, [rooms.length, plants]);

  useEffect(() => {
    const fetchWateringData = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const wateringData = await getWateringHistory(userId);
        setWateringHistory(wateringData);
      }
    };

    fetchWateringData();
  }, []);

  useEffect(() => {
    const calculateAndSetPercentage = async () => {
      if (
        wateringHistory &&
        Object.keys(wateringHistory).length > 0 &&
        plants.length > 0
      ) {
        const percentage = await calculateDailyWateredPercentage(
          wateringHistory,
          plants,
          selectedDate
        );
        setDailyPercentage(percentage);
      }
    };

    calculateAndSetPercentage();
  }, [selectedDate, wateringHistory, plants]);

  const onDaySelect = async (day) => {
    setSelectedDate(day.dateString);
    const percentage = await calculateDailyWateredPercentage(
      wateringHistory,
      plants,
      day.dateString
    );
    setDailyPercentage(percentage);
  };

  const getMarkedDates = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    let markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        customStyles: {
          container: { backgroundColor: colors.primary },
          text: { color: colors.textWhite },
        },
      };
    }

    if (currentDate !== selectedDate) {
      markedDates[currentDate] = {
        customStyles: {
          container: { backgroundColor: colors.background },
          text: { color: colors.primary },
        },
      };
    }

    return markedDates;
  };

  const calculateDailyWateredPercentage = (
    wateringHistory,
    plants,
    selectedDate
  ) => {
    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const wateredPlants = plants.filter((plant) => {
      const events = wateringHistory[plant.id] || [];
      return events.some((event) => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= dayStart && eventDate < dayEnd;
      });
    });

    return (wateredPlants.length / plants.length) * 100;
  };

  const wateredPlantsPercentage = calculateDailyWateredPercentage(
    wateringHistory,
    plants,
    selectedDate
  );

  const renderPlant = (plant: PlantInfoWithRoom) => {
    return (
      <TouchableOpacity
        style={styles.requiringSupportPlantContainer}
        onPress={() => navigateToPlantDetailScreen(plant)}
      >
        <Image
          source={{ uri: plant.photo }}
          style={styles.requiringSupportPlantImage}
        />
        <View style={{ flex: 1, paddingLeft: defaultStyles.padding }}>
          <Text style={styles.requiringSupportPlantName}>
            {/* {plant.nickname.length ? plant.nickname : plant.commonName} */}
            {plant.commonName}
          </Text>
          <Text style={styles.requiringSupportPlantRoom}>{plant.roomName}</Text>
          <Text style={styles.requiringSupportPlantWatering}>
            {plant.lastWatered} {plant.lastWatered === 1 ? "day" : "days"} ago{" "}
          </Text>
        </View>
        <View style={styles.requiringSupportButton}>
          <Ionicons
            name="chevron-forward-outline"
            size={26}
            color={colors.textBlack}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const navigateToPlantsScreen = () => {
    navigation.navigate("PlantsScreen");
  };

  // This works, lol
  const navigateToPlantDetailScreen = (plant: PlantInfo) => {
    navigation.navigate("PlantDetailScreen", { plant: plant });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ModalConfirm
          title={t("warning_email_not_verified_title")}
          text={t("warning_email_not_verified_text")}
          buttonText={t("okay")}
          isVisible={showEmailConfirmation}
          onClose={() => setShowEmailConfirmation(false)}
        />

        <View style={styles.topContainer}>
          <View style={styles.topButtonsContainer}>
            <View style={{ marginRight: -defaultStyles.padding }}>
              <ButtonIcon
                backgroundColor="transparent"
                iconSet="AntDesign"
                iconName="calendar"
                onPress={toggleCalendar}
              />
            </View>

            <ButtonIcon
              backgroundColor="transparent"
              iconSet="Ionicons"
              iconName="settings-outline"
              onPress={navigateToSettings}
            />
          </View>

          <View style={styles.calendarContainer}>
            <CalendarProvider date={selectedDate}>
              <WeekCalendar
                firstDay={1}
                allowShadow={false}
                onDayPress={onDaySelect}
                date={selectedDate}
                theme={{
                  todayTextColor: colors.primary,
                  selectedDayBackgroundColor: colors.primary,
                  textDisabledColor: colors.textGrey,
                  dayTextColor: colors.textGrey,
                }}
              />
            </CalendarProvider>
          </View>
        </View>

        {/* Line under the top calendar */}
        <View
          style={{
            borderBottomColor: "#000",
            opacity: 0.1,
            borderBottomWidth: 1,
          }}
        />

        <View style={styles.contentContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.progressBar}>
              <AnimatedCircularProgress
                backgroundColor="#F5F5F5"
                size={200}
                width={10}
                fill={dailyPercentage}
                tintColor={colors.primary}
                lineCap="round"
              >
                {(fill) => (
                  <Text style={styles.progressBarText}>
                    {Math.round(fill)}%{"\n"}done
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>

            <View style={{ height: defaultStyles.padding }} />

            <View style={styles.requiringSupportContainerShadow}>
              <View style={styles.requiringSupportContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="alert-circle-outline"
                      size={36}
                      color={colors.primary}
                    />
                    <Text style={styles.requiringSupportText}>
                      {t("HomeScreen_requiring_support")}
                    </Text>
                  </View>

                  <ButtonText
                    text={t("HomeScreen_requiring_support_view_all")}
                    textColor={colors.primary}
                    fontFamily={fonts.regular}
                    fontSize={fontSize.large}
                    alignSelf="center"
                    onPress={navigateToPlantsScreen}
                  />
                </View>

                <View style={{ height: defaultStyles.padding / 2 }} />

                {allPlants.length > 0 ? (
                  allPlants.map((plant) => renderPlant(plant))
                ) : (
                  <Text style={styles.requiringSupportNoPlantsText}>
                    {t("HomeScreen_requiring_support_no_plants")}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showCalendar}
            onRequestClose={toggleCalendar}
          >
            <TouchableWithoutFeedback onPress={toggleCalendar}>
              <View style={styles.modalOverlay}>
                <Calendar
                  onDayPress={onDaySelect}
                  onDayLongPress={(day) => {
                    console.log("selected day", day);
                  }}
                  onMonthChange={(month) => {
                    console.log("month changed", month);
                  }}
                  hideExtraDays={true}
                  firstDay={1}
                  onPressArrowLeft={(subtractMonth) => subtractMonth()}
                  onPressArrowRight={(addMonth) => addMonth()}
                  enableSwipeMonths={true}
                  current={selectedDate}
                  markedDates={getMarkedDates()}
                  markingType={"custom"}
                  theme={{
                    arrowColor: colors.primary,
                    todayTextColor: colors.primary,
                    textDisabledColor: colors.textGrey,
                    dayTextColor: colors.textGrey,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <ModalConfirm
            title={t("error")}
            text={errorMessage}
            buttonText={t("try_again")}
            isVisible={showError}
            onClose={() => setShowError(false)}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: defaultStyles.padding,
  },
  topContainer: {
    flex: 1,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  calendarContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 6,
    paddingHorizontal: defaultStyles.padding,
  },
  requiringSupportContainerShadow: {
    borderRadius: defaultStyles.rounding,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  requiringSupportContainer: {
    backgroundColor: colors.background,
    padding: defaultStyles.padding,
    borderRadius: defaultStyles.rounding,
    overflow: "hidden",
  },
  requiringSupportText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textGrey,
    paddingLeft: defaultStyles.padding / 2,
  },
  requiringSupportNoPlantsText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    textAlign: "center",
  },
  requiringSupportPlantContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: defaultStyles.rounding,
    padding: defaultStyles.padding / 2,
  },
  requiringSupportPlantImage: {
    width: 80,
    height: 80,
    borderRadius: defaultStyles.rounding,
  },
  requiringSupportPlantName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.largePlus,
    color: colors.textBlack,
  },
  requiringSupportPlantRoom: {
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textGrey,
  },
  requiringSupportPlantWatering: {
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textGrey,
  },
  requiringSupportButton: {
    color: colors.primary,
    backgroundColor: colors.background,
    width: 40,
    height: 40,
    borderColor: "#E3E3E3",
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: defaultStyles.padding,
  },
  progressBar: {
    paddingTop: defaultStyles.padding,
    alignItems: "center",
  },
  progressBarText: {
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 40,
    color: colors.primary,
  },
});

export default HomeScreen;
