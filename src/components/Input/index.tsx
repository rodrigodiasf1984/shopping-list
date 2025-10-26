import { TextInputProps, TextInput } from "react-native";
import React from "react";
import { styles } from "./styles";

const Input = ({ ...rest }: TextInputProps) => {
  return <TextInput style={styles.container} {...rest} />;
};

export default Input;
