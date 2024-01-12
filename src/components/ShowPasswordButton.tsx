import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface ShowPasswordButtonProps {
  activeOpacity?: number | undefined;
  color: string;
  trigger: boolean;
  styles: object;
  onPress: () => void;
}

const ShowPasswordButton: React.FC<ShowPasswordButtonProps> = ({
  activeOpacity,
  color,
  trigger,
  styles,
  onPress,
}) => {
  return (
    <View style={styles}>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
        {trigger ? (
          <Ionicons name="eye-off" size={24} color={color} />
        ) : (
          <Ionicons name="eye" size={24} color={color} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ShowPasswordButton;
