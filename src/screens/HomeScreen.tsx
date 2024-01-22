import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, defaultStyles, fonts, fontSize } from "../utils/colors";
import i18n from "../../assets/translations/i18n";

// Firebase
import { auth } from "../firebase";

// Components
import ModalConfirm from "../components/ModalConfirm";
import ButtonIcon from "../components/ButtonIcon";
import { HomeScreenProps } from "../utils/types";
import { useLanguage } from "../utils/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import ButtonWide from "../components/ButtonWide";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Svg, { Circle } from "react-native-svg";

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
          <ButtonIcon
            iconSet="Ionicons"
            iconName="settings-outline"
            onPress={navigateToSettings}
          />
        </View>

        <View style={styles.searchContainer}>
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
        </View>

        <View style={styles.progressBar}>
          <AnimatedCircularProgress
            backgroundColor="#F5F5F5"
            size={200}
            width={10}
            fill={50}
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

        <Modal
          animationType="fade"
          transparent={true}
          visible={showSearchSettings}
          onRequestClose={toggleSearchSettings}
        >
          <TouchableWithoutFeedback onPress={toggleSearchSettings}>
            <View style={styles.searchSettingsModalOverlay}>
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
                    {renderCheckboxes(maintenance, maintenance, setMaintenance)}

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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: defaultStyles.padding,
    paddingTop: defaultStyles.padding,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  searchSettingsModalOverlay: {
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
    paddingTop: defaultStyles.padding * 2,
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
