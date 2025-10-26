import { View, Image } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <Input placeholder="add an item to the list" />
      <Button title="Add" />
    </View>
  );
}
