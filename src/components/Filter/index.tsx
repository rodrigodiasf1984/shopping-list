import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { CircleCheck } from "lucide-react-native";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export default function Filter({ isActive, status, ...rest }: FilterProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      {...rest}
    >
      <CircleCheck size={18} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Purchased" : "Pending"}
      </Text>
    </TouchableOpacity>
  );
}
