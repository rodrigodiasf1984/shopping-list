import React from "react";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { Text, TouchableOpacity, View } from "react-native";
import StatusIcon from "../StatusIcon";
import { Trash2 } from "lucide-react-native";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type ItemProps = {
  data: ItemData;
  onRemove: () => void;
  onStatus: () => void;
};

export function Item({ data, onRemove, onStatus }: ItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={styles.description}>{data.description}</Text>
      <TouchableOpacity onPress={onRemove} activeOpacity={0.8}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
