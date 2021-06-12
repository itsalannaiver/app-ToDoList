import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CheckBox(props) {
  const [checked, onChange] = useState(props.checked);

  const handleCheckMark = () => {
    onChange((s) => {
      props.changeChecked(!s);
      return !s;
    });
  };

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={handleCheckMark}
    >
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#DD034E",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "#DD034E",
  },
});
