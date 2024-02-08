import React, { useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
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
          color={colors.textWhite}
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

          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.infoTextDelimiterLine} />

          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.sectionText}>{plant.description}</Text>
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
  careInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.primary,
    borderRadius: defaultStyles.rounding,
    marginBottom: defaultStyles.padding,
    paddingHorizontal: defaultStyles.padding,
  },
  careInfo: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  careInfoText: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.small,
    color: colors.textWhite,
    paddingBottom: 5,
  },
  careInfoValue: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.small + 1,
    color: colors.textWhite,
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
