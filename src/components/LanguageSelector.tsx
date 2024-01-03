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

// SVG icons
import ArrowDown from "./../../assets/images/AuthScreen/ArrowDown.svg";

// Flags
import USFlag from "./../../assets/images/Flags/us.svg";
import CZFlag from "./../../assets/images/Flags/cz.svg";
import SKFlag from "./../../assets/images/Flags/sk.svg";
import ALFlag from "./../../assets/images/Flags/al.svg";

const languages = [
  {
    code: "en",
    flag: USFlag,
  },
  {
    code: "cs",
    flag: CZFlag,
  },
  {
    code: "sk",
    flag: SKFlag,
  },
  {
    code: "al",
    flag: ALFlag,
  },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
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

  const renderLanguageItem = ({ item }: { item: (typeof languages)[0] }) => (
    <LanguageItem value={item.code} flag={item.flag} />
  );

  return (
    <View style={styles.languageSelector}>
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
    top: 5,
    left: 35,
    width: 72,
    height: 30,
    borderRadius: 18,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
