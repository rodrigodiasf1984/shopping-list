import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  {
    id: "1",
    status: FilterStatus.DONE,
    description: "Pasta",
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    description: "Salmon",
  },
  { id: "3", status: FilterStatus.PENDING, description: "Milk" },
];

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input placeholder="add an item to the list" />
        <Button title="Add" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((fs) => (
            <Filter key={fs} status={fs} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>Try to add some items</Text>
          )}
          renderItem={({ item }) => (
            <Item
              onRemove={() => console.log("remove")}
              onStatus={() => console.log("status")}
              data={item}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}
