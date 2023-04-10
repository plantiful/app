import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

import i18n from '../../translations/i18n';

import USFlag from './../../assets/images/Flags/us.svg';
import CZFlag from './../../assets/images/Flags/cz.svg';

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
      <Flag width={60} height={25} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.languageSelector}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        {selectedLanguage === 'en' ? (
          <USFlag width={60} height={25} />
        ) : (
          <CZFlag width={60} height={25} />
        )}
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
          <View style={styles.dropdownMenu}>
            <LanguageItem value="en" flag={USFlag} />
            <LanguageItem value="cs" flag={CZFlag} />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  languageSelector: {
    position: 'absolute',
    top: 5,
    left: 25,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 5,
    left: 25,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});

export default LanguageSelector;