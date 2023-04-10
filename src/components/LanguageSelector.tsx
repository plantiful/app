import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import i18n from '../../translations/i18n';

import USFlag from './../../assets/images/Flags/us.svg';
import CZFlag from './../../assets/images/Flags/cz.svg';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
  };

  const LanguageItem = ({
    label,
    value,
    flag: Flag,
  }: {
    label: string;
    value: string;
    flag: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }) => (
    <Picker.Item
      label={label}
      value={value}
      key={value}
      color="black"
      style={styles.languageItem}
    />
  );

  return (
    <View style={styles.languageSelector}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={changeLanguage}
        dropdownIconColor="black"
        style={styles.picker}
      >
        <LanguageItem label="English" value="en" flag={USFlag} />
        <LanguageItem label="Čeština" value="cs" flag={CZFlag} />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  languageSelector: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  picker: {
    width: 150,
    height: 40,
  },
  languageItem: {
    flexDirection: 'row',
  },
});

export default LanguageSelector;
