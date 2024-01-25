import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddPlantScreenProps } from "../utils/types";
import ButtonBack from "../components/ButtonBack";
import { defaultStyles } from "../utils/colors";

const AddPlantScreen: React.FC<AddPlantScreenProps> = ({
  navigation,
  roomId,
}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingLeft: defaultStyles.padding }}>
        <ButtonBack onPress={goBack} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: defaultStyles.padding,
  },
});

export default AddPlantScreen;
