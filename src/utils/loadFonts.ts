import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-Regular': require('./../../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./../../assets/fonts/Inter-Medium.ttf'),
  });
};