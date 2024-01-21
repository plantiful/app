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

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const searchInputRef = useRef<TextInput>(null!);

  const [searchText, setSearchText] = useState("");
  const [showSearchSettings, setShowSearchSettings] = useState(false);

  const [plantType, setPlantType] = useState({
    Annual: false,
    Perennial: false,
    Succulent: false,
    Cactus: false,
  });
  const [growthHabit, setGrowthHabit] = useState({
    Tree: false,
    Shrub: false,
    Vine: false,
    Groundcover: false,
    Grass: false,
  });
  const [wateringNeeds, setWateringNeeds] = useState({
    Low: false,
    Medium: false,
    High: false,
  });
  const [size, setSize] = useState({
    Small: false, // up to 1 ft
    Medium: false, // 1-3 ft
    Large: false, // 3-6 ft
    ExtraLarge: false, // 6+ ft
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
      <View key={key} style={styles.searchSettingsCheckboxContainer}>
        <Text style={styles.searchSettingsCheckboxLabel}>
          {key.replace(/([A-Z])/g, " $1").trim()}
        </Text>
        <Checkbox
          color={state[key] ? colors.primary : undefined}
          value={state[key]}
          onValueChange={() => setState({ ...state, [key]: !state[key] })}
        />
      </View>
    ));
  };

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { language } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { t } = i18n;

  useEffect(() => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  }, [language]);

  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const checkEmailVerification = () => {
    const user = auth.currentUser;
    if (user && user.emailVerified === false) {
      setShowEmailConfirmation(true);
    }
  };

  useEffect(() => {
    // checkEmailVerification();
  }, []);

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
          title={t("HomeScreen_email_confirmation_title")}
          text={t("HomeScreen_email_confirmation_text")}
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
              placeholder="Search plants"
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
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
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
                  <Text
                    style={{
                      fontFamily: fonts.medium,
                      fontSize: 30,
                      color: colors.primary,
                      paddingBottom: 5,
                    }}
                  >
                    Filters
                  </Text>

                  <Text style={styles.searchSettingsFilterTitle}>
                    Watering Needs
                  </Text>
                  {renderCheckboxes(
                    wateringNeeds,
                    wateringNeeds,
                    setWateringNeeds
                  )}

                  <Text style={styles.searchSettingsFilterTitle}>Size</Text>
                  {renderCheckboxes(size, size, setSize)}

                  <Text style={styles.searchSettingsFilterTitle}>
                    Maintenance
                  </Text>
                  {renderCheckboxes(maintenance, maintenance, setMaintenance)}

                  <Text style={styles.searchSettingsFilterTitle}>Special</Text>
                  {renderCheckboxes(special, special, setSpecial)}
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
    width: "82%",
    height: 60,
    borderRadius: defaultStyles.rounding,
    paddingHorizontal: defaultStyles.padding,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    backgroundColor: "#EBEBEB",
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: fontSize.medium,
    color: colors.textBlack,
    paddingHorizontal: defaultStyles.padding / 2,
    width: "80%",
    height: "100%",
  },
  searchSettingsRect: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 60,
    backgroundColor: "#EBEBEB",
    borderRadius: defaultStyles.rounding,
  },
  searchSettingsModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  searchSettingsModalContainer: {
    backgroundColor: colors.background,
    padding: defaultStyles.padding,
    borderRadius: defaultStyles.rounding,
    margin: 20,
    width: "90%",
    maxHeight: "80%",
  },
  searchSettingsFilterTitle: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.largePlus,
    color: colors.textGrey,
    paddingBottom: 5,
  },
  searchSettingsCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingRight: defaultStyles.padding,
  },
  searchSettingsCheckboxLabel: {
    fontFamily: fonts.medium,
    fontSize: fontSize.large,
    color: colors.textGrey,
  },
  searchSettingsCheckbox: {
    width: 36,
    height: 36,
    borderColor: colors.primary,
  },
});

export default HomeScreen;
