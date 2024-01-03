import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors, fonts, fontSizes } from "../utils/colors";
import SvgIcon from "../../assets/images/SearchScreen/CameraSearch.svg";

// Add a type for the StackParamList
type StackParamList = {
  Camera: undefined;
};

// Define the navigation prop type
type SearchScreenNavigationProp = StackNavigationProp<StackParamList, "Camera">;

// Update the component definition to receive the "navigation" prop with the correct type
interface SearchScreenProps {
  navigation: SearchScreenNavigationProp;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor={colors.textBlack}
        />
        {/* Update the TouchableOpacity onPress handler */}
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <SvgIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20, // Adjust this value as needed
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 16,
  },
  searchBar: {
    flex: 1,
    height: 36, // Adjust the height of the search bar here
    backgroundColor: colors.lightGrey,
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: fontSizes.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
    marginRight: 16,
  },
  text: {
    fontSize: fontSizes.large,
    fontFamily: fonts.medium,
    color: colors.textBlack,
    textAlign: "center",
    marginTop: 16,
  },
});

export default SearchScreen;
