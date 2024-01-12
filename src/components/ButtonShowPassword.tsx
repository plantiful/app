import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface ButtonShowPasswordProps {
  color: string;
  trigger: boolean;
  styles: object;
  onPress: () => void;
}

const ButtonShowPassword: React.FC<ButtonShowPasswordProps> = ({
  color,
  trigger,
  styles,
  onPress,
}) => {
  return (
    <View style={styles}>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        {trigger ? (
          <Ionicons name="eye-off" size={24} color={color} />
        ) : (
          <Ionicons name="eye" size={24} color={color} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonShowPassword;
