import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, fontSizes } from '../utils/colors';

const PlantsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plant Pod Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSizes.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
  },
});

export default PlantsScreen;
