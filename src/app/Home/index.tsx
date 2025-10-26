import { View, Image } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input placeholder="add an item to the list" />
        <Button title="Add" />
      </View>
      <View style={styles.content}>
        <Filter status={FilterStatus.DONE} isActive />
        <Filter status={FilterStatus.PENDING} isActive={false} />
      </View>
    </View>
  );
}
