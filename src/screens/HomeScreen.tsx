import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
  Animated,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth, getCurrentUserId, getWateringHistory } from "../firebase";

// Components
import ModalConfirm from "../components/ModalConfirm";
import ButtonIcon from "../components/ButtonIcon";
import { HomeScreenProps } from "../utils/types";
import { useLanguage } from "../utils/LanguageContext";
import { TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import ButtonWide from "../components/ButtonWide";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {
  Calendar,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import ButtonText from "../components/ButtonText";
import PlantContext from "./PlantContext";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const searchInputRef = useRef<TextInput>(null!);

  const [searchText, setSearchText] = useState("");
  const [showSearchSettings, setShowSearchSettings] = useState(false);

  const [wateringNeeds, setWateringNeeds] = useState({
    Low: false,
    Medium: false,
    High: false,
  });
  const [size, setSize] = useState({
    Small: false, // up to 1 ft
    Medium: false, // 1-3 ft
    Large: false, // 3-6 ft
  });
  const [maintenance, setMaintenance] = useState({
    LowMaintenance: false,
    MediumMaintenance: false,
    HighMaintenance: false,
  });
  const [special, setSpecial] = useState({
    PetFriendly: false,
    AirPurifying: false,
  });

  const renderCheckboxes = (category, state, setState) => {
    return Object.keys(category).map((key) => (
      <View key={key} style={styles.searchSettingsModalCheckboxContainer}>
        <Text style={styles.searchSettingsModalCheckboxLabel}>
          {key.replace(/([A-Z])/g, " $1").trim()}
        </Text>
        <Checkbox
          style={styles.searchSettingsModalCheckbox}
          color={state[key] ? colors.primary : undefined}
          value={state[key]}
          onValueChange={() => setState({ ...state, [key]: !state[key] })}
        />
      </View>
    ));
  };

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { t } = i18n;

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

  const [wateringHistory, setWateringHistory] = useState({});
  const [dailyPercentage, setDailyPercentage] = useState(0);

  const { plants } = useContext(PlantContext);

  // Fetch the watering history from Firebase on component mount
  useEffect(() => {
    const fetchWateringData = async () => {
      const userId = getCurrentUserId();
      if (userId) {
        const history = await getWateringHistory(userId);
        setWateringHistory(history);
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
    setDailyPercentage(percentage); // Update the daily percentage state
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

  const needsWatering = (plant) => {
    return plant.lastWatered < plant.watering;
  };

  const renderItem = ({ item }) => {
    const daysSinceLastWatered = needsWatering(item.lastWatered);
    return (
      <TouchableOpacity style={styles.requiringSupportPlantContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.requiringSupportPlantImage}
        />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.requiringSupportPlantName}>
            {item.commonName}
          </Text>
          <Text style={styles.requiringSupportPlantRoom}>
            {item.scientificName}
          </Text>
          <Text
            style={styles.requiringSupportPlantWatering}
          >{`${daysSinceLastWatered} days ago`}</Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={30}
          color={colors.primary}
        />
      </TouchableOpacity>
    );
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  const toggleSearchSettings = () => {
    setShowSearchSettings(!showSearchSettings);
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

        <View style={{ borderBottomColor: "#f1f1f1", borderBottomWidth: 1 }} />

        <View style={styles.contentContainer}>
          {/* <View style={styles.searchContainer}>
            <View style={styles.searchRect}>
              <Ionicons name="search-outline" size={24} color="black" />
              <TextInput
                placeholder={t("HomeScreen_search_bar_placeholder")}
                placeholderTextColor={colors.textGrey}
                keyboardType="default"
                returnKeyType="search"
                ref={searchInputRef}
                onChangeText={(text) => setSearchText(text)}
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.searchSettingsRect}
              onPress={toggleSearchSettings}
            >
              <ButtonIcon
                backgroundColor="transparent"
                iconSet="Ionicons"
                iconName="options-outline"
                iconSize={24}
                onPress={toggleSearchSettings}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.progressBar}>
            <AnimatedCircularProgress
              backgroundColor="#F5F5F5"
              size={200}
              width={10}
              fill={dailyPercentage}
              tintColor={colors.primary}
              lineCap="round"
              // onAnimationComplete={() => console.log("onAnimationComplete")}
            >
              {(fill) => (
                <Text style={styles.progressBarText}>
                  {Math.round(fill)}%{"\n"}done
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          <View style={{ height: defaultStyles.padding }} />

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
                  size={30}
                  color={colors.primary}
                />
                <Text style={styles.requiringSupportText}>
                  {t("HomeScreen_requiring_support")}
                </Text>
              </View>

              <ButtonText
                text={t("HomeScreen_requiring_support_view_all")}
                textColor={colors.primary}
                fontFamily={fonts.semiBold}
                fontSize={fontSize.large}
                alignSelf="center"
                onPress={() => {}}
              />
            </View>
            <FlatList
              data={plants}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={{ flex: 1 }}
            />
          </View>

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
                    //  todayBackgroundColor: colors.primary,
                    // selectedDayBackgroundColor: colors.primary,
                    textDisabledColor: colors.textGrey,
                    dayTextColor: colors.textGrey,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showSearchSettings}
            onRequestClose={toggleSearchSettings}
          >
            <TouchableWithoutFeedback onPress={toggleSearchSettings}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                  <View style={styles.searchSettingsModalContainer}>
                    <ScrollView>
                      <Text style={styles.searchSettingsModalFilterTitle}>
                        {t("HomeScreen_search_settings_watering_needs")}
                      </Text>
                      {renderCheckboxes(
                        wateringNeeds,
                        wateringNeeds,
                        setWateringNeeds
                      )}

                      <Text style={styles.searchSettingsModalFilterTitle}>
                        {t("HomeScreen_search_settings_size")}
                      </Text>
                      {renderCheckboxes(size, size, setSize)}

                      <Text style={styles.searchSettingsModalFilterTitle}>
                        {t("HomeScreen_search_settings_maintenance")}
                      </Text>
                      {renderCheckboxes(
                        maintenance,
                        maintenance,
                        setMaintenance
                      )}

                      <Text style={styles.searchSettingsModalFilterTitle}>
                        {t("HomeScreen_search_settings_special")}
                      </Text>
                      {renderCheckboxes(special, special, setSpecial)}

                      <View style={{ height: defaultStyles.padding }} />

                      <ButtonWide
                        text={t("HomeScreen_search_settings_apply_filters")}
                        onPress={toggleSearchSettings}
                      />
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
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
    flex: 0.35,
  },
  topButtonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  calendarContainer: {
    flex: 0.25,
  },
  contentContainer: {
    paddingHorizontal: defaultStyles.padding,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: defaultStyles.padding,
  },
  searchRect: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 60,
    borderRadius: defaultStyles.rounding,
    paddingHorizontal: defaultStyles.padding,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    backgroundColor: "#F5F5F5",
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
    paddingHorizontal: defaultStyles.padding,
  },
  searchSettingsRect: {
    justifyContent: "center",
    height: 60,
    backgroundColor: "#F5F5F5",
    borderRadius: defaultStyles.rounding,
  },
  requiringSupportContainer: {
    backgroundColor: "#F5F5F5",
    padding: defaultStyles.padding,
    borderRadius: defaultStyles.rounding,
  },
  requiringSupportText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.large,
    color: colors.textGrey,
    paddingLeft: defaultStyles.padding / 2,
  },
  requiringSupportPlantContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  requiringSupportPlantImage: {
    width: 100,
    height: 100,
    borderRadius: defaultStyles.rounding,
  },
  requiringSupportPlantName: {
    fontFamily: fonts.medium,
    fontSize: fontSize.large,
    color: colors.textBlack,
    paddingVertical: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: defaultStyles.padding,
  },
  searchSettingsModalContainer: {
    backgroundColor: colors.background,
    padding: defaultStyles.padding,
    borderRadius: defaultStyles.rounding,
    width: "100%",
  },
  searchSettingsModalFilterTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSize.largePlus,
    color: colors.textGrey,
    paddingVertical: 5,
  },
  searchSettingsModalCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchSettingsModalCheckboxLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.large,
    color: colors.textGrey,
  },
  searchSettingsModalCheckbox: {
    width: 24,
    height: 24,
    borderColor: colors.primary,
    marginVertical: 2,
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
