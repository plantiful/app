import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Text,
} from "react-native";

import i18n from "../../assets/translations/i18n";
import ArrowDown from "./../../assets/images/AuthScreen/ArrowDown.svg";

import { colors, fonts, fontSizes } from "../utils/colors";

// Define the type for the language data
type LanguageType = {
  code: string;
  flag: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

type LanguageSelectorProps = {
  languages: LanguageType[];
  initialLanguage?: string;
  style?: object;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  initialLanguage = i18n.language,
  style = {},
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const changeLanguage = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    setDropdownVisible(false);
  };

  const LanguageItem = ({
    value,
    flag: Flag,
  }: {
    value: string;
    flag: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => changeLanguage(value)}
    >
      <Flag width={20} height={15} style={styles.flag} />
      <Text style={styles.languageCode}>{value.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  const renderLanguageItem = ({ item }: { item: LanguageType }) => (
    <LanguageItem value={item.code} flag={item.flag} />
  );

  return (
    <View style={[styles.languageSelector, style]}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        <View style={styles.innerSelector}>
          {languages
            .find((lang) => lang.code === selectedLanguage)
            ?.flag({
              width: 20,
              height: 15,
              style: styles.flag,
            }) || null}
          <Text style={styles.languageCode}>
            {selectedLanguage.toUpperCase()}
          </Text>
          <ArrowDown width={12} height={8} style={styles.arrow} />
        </View>
      </TouchableOpacity>
      <Modal
        visible={dropdownVisible}
        transparent
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setDropdownVisible(false)}
          activeOpacity={1}
        >
          <FlatList
            data={languages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.code}
            style={styles.dropdownMenu}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageSelector: {
    position: "absolute",
    width: 72,
    height: 30,
    borderRadius: 18,
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  innerSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  flag: {
    marginLeft: 8,
  },
  languageCode: {
    marginLeft: 5,
  },
  arrow: {
    marginLeft: 2.5,
    marginTop: 2.5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: 35,
    width: 100,
    height: 130,
    backgroundColor: "white",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 5,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginLeft: -5,
  },
});

export default LanguageSelector;
