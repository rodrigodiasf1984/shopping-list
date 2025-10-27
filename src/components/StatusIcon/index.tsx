import { View, Text } from "react-native";
import React from "react";
import { FilterStatus } from "@/types/FilterStatus";
import { CircleCheck, CircleDashed } from "lucide-react-native";

const StatusIcon = ({ status }: { status: FilterStatus }) => {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#2C46B1" />
  ) : (
    <CircleDashed size={18} color="#000000" />
  );
};

export default StatusIcon;
