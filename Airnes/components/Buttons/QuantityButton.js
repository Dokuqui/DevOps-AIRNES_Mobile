import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function CustomButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "open-bold",
  },
});
