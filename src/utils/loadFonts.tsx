import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "OpenSans-Bold": require("./../../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-BoldItalic": require("./../../assets/fonts/OpenSans-BoldItalic.ttf"),
    "OpenSans-ExtraBold": require("./../../assets/fonts/OpenSans-ExtraBold.ttf"),
    "OpenSans-ExtraBoldItalic": require("./../../assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-Italic": require("./../../assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Light": require("./../../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-LightItalic": require("./../../assets/fonts/OpenSans-LightItalic.ttf"),
    "OpenSans-Medium": require("./../../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-MediumItalic": require("./../../assets/fonts/OpenSans-MediumItalic.ttf"),
    "OpenSans-Regular": require("./../../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./../../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-SemiBoldItalic": require("./../../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  });
};
