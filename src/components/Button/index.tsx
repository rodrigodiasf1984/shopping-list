import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type ButtonProps = {
  title: string;
};

export default function Button({ title }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
