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
  getItemsByStatus,
  ItemStorage,
  removeItem,
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
    setFilter(FilterStatus.PENDING);
    Alert.alert("Added", `Item added ${description}`);
    setDescription("");
  }

  async function handleRemove(itemId: string) {
    try {
      await removeItem(itemId);
      await getFilteredItems();
    } catch (error) {
      console.log(error);
      Alert.alert("Remove", "An error ocurred while removing");
    }
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

  function handleClear() {
    Alert.alert("Clear", "Are you sure you want to delete all items?");
  }

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
          value={description}
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
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
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
              onRemove={() => handleRemove(item.id)}
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
