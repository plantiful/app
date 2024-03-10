import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { PlantInfo } from "../firebase";
import ButtonBack from "../components/ButtonBack";
import { colors, defaultStyles, fontSize, fonts } from "../utils/colors";

interface PlantDetailScreenProps {
  route: {
    params: {
      plant: PlantInfo;
    };
  };
  navigation: any;
}

const PlantDetailScreen: React.FC<PlantDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { plant } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const goBack = () => {
    navigation.goBack();
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [450, 200],
    extrapolate: "clamp",
  });

  const GreenButton = ({ iconName, label, onPress }) => {
    return (
      <TouchableOpacity style={styles.greenButton} onPress={onPress}>
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color="#205950"
          opacity={100}
        />
      </TouchableOpacity>
    );
  };

  const displayCareInfo = (
    iconName: any,
    text: string,
    value: any,
    valueText: string
  ) => {
    return (
      <View style={styles.careInfo}>
        <MaterialCommunityIcons
          name={iconName}
          size={26}
          paddingBottom={5}
          color={colors.primary}
        />
        <Text style={styles.careInfoText}>{text}</Text>
        <Text style={styles.careInfoValue}>
          {value} {valueText}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Animated.Image
          source={{ uri: plant.photo }}
          style={{ width: "100%", height: headerHeight }}
        />

        <View
          style={{
            paddingLeft: defaultStyles.padding,
            position: "absolute",
            top: defaultStyles.padding,
            zIndex: 1,
          }}
        >
          <ButtonBack color="white" onPress={goBack} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.dragLine} />

          <Text style={styles.plantCommonName}>{plant.commonName}</Text>
          <Text style={styles.plantScientificName}>{plant.scientificName}</Text>

          <View style={styles.buttonContainer}>
            <GreenButton
              iconName="heart-outline"
              label="Like"
              onPress={() => {}}
            />
            <GreenButton iconName="plus" label="Plus" onPress={() => {}} />
          </View>

          <View style={styles.careInfoContainer}>
            {displayCareInfo("weather-sunny", "SUN LIGHT", plant.sunlight, "%")}

            {displayCareInfo(
              "thermometer-low",
              "TEMPERATURE",
              plant.temperature,
              "°C"
            )}

            {displayCareInfo(
              "water-outline",
              "WATERING",
              plant.watering * 125,
              "ml/week"
            )}
          </View>

          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoTextDelimiterLine} />

          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.sectionText}>{plant.description}</Text>

          <Text style={styles.sectionTitle}>Taxonomy</Text>
          <View style={styles.infoTextDelimiterLine} />

          <Text style={styles.sectionHeader}>Origin</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.class}</Text>
          <Text style={styles.sectionHeader}>Family</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.family}</Text>
          <Text style={styles.sectionHeader}>Genus</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.genus}</Text>
          <Text style={styles.sectionHeader}>Kingdom</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.kingdom}</Text>
          <Text style={styles.sectionHeader}>Order</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.order}</Text>
          <Text style={styles.sectionHeader}>Phylum</Text>
          <Text style={styles.sectionText}>{plant.taxonomy.phylum}</Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: defaultStyles.padding,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#fff",
    marginTop: -20,
  },
  dragLine: {
    alignSelf: "center",
    backgroundColor: "#000",
    opacity: 0.1,
    height: 4,
    width: 100,
  },
  plantCommonName: {
    fontFamily: fonts.bold,
    fontSize: 26,
    color: colors.textBlack,
    paddingTop: defaultStyles.padding,
  },
  plantScientificName: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.textGrey,
    paddingBottom: defaultStyles.padding,
  },
  // TODO: Change from absolute
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 45,
    right: defaultStyles.padding,
  },
  greenButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(32, 89, 80, 0.2)",
    width: 40,
    height: 40,
    borderRadius: defaultStyles.rounding,
    margin: 4,
  },
  careInfoContainer: {
    flexDirection: "row",
    backgroundColor: colors.background,
    marginBottom: defaultStyles.padding,
  },
  careInfo: {
    justifyContent: "center",
    borderRadius: defaultStyles.rounding,
    borderColor: colors.textGrey,
    borderWidth: 0.5,
    marginRight: defaultStyles.padding / 2,
    paddingHorizontal: defaultStyles.padding / 2,
    height: 100,
    width: 110,
  },
  careInfoText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.small,
    color: colors.textGrey,
    paddingBottom: 5,
  },
  careInfoValue: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.medium,
    color: colors.textBlack,
  },
  sectionTitle: {
    fontFamily: fonts.medium,
    fontSize: 22,
    color: "#000",
    paddingTop: 5,
  },
  sectionHeader: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: "#000",
    paddingBottom: 5,
  },
  sectionText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.medium,
    color: colors.textGrey,
    textAlign: "justify",
    paddingBottom: 5,
  },
  infoTextDelimiterLine: {
    borderBottomColor: "#000",
    opacity: 0.3,
    borderBottomWidth: 0.5,
    marginVertical: 10,
  },
});

export default PlantDetailScreen;
