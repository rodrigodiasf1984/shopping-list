import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import {
  addItem,
  getItems,
  getItemsByStatus,
  ItemStorage,
} from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
export function Home() {
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
    }

    const newItem = {
      id: Math.random().toString().substring(2),
      description,
      status: FilterStatus.PENDING,
    };
    await addItem(newItem);
    await getFilteredItems();
  }

  const getFilteredItems = async () => {
    try {
      const response = await getItemsByStatus(filter);
      setItems(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "error get when getting items data");
    }
  };

  useEffect(() => {
    getFilteredItems();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input
          placeholder="add an item to the list"
          onChangeText={setDescription}
        />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>Try to add some items</Text>
          )}
          renderItem={({ item }) => (
            <Item
              onRemove={() => console.log("remove")}
              onStatus={() => console.log("mudar o status")}
              data={item}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}
