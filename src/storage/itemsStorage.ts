import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@shoppingList:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

export const getItems = async (): Promise<ItemStorage[]> => {
  try {
    const items = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
};

export const getItemByStatus = async (
  status: FilterStatus
): Promise<ItemStorage[]> => {
  const items = await getItems();
  return items.filter((item) => item.status === status);
};

const saveItems = async (items: ItemStorage[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
};

export const addItem = async (newItem: ItemStorage): Promise<ItemStorage[]> => {
  const items = await getItems();
  const updateItems = [...items, newItem];
  await saveItems(updateItems);
  return updateItems;
};
