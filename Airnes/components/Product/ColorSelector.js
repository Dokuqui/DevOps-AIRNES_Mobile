import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function ColorSelector({ colors, selectedColor, onSelectColor }) {
  const handleColorSelection = (color) => {
    onSelectColor(color);
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>Color:</Text>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.colorCircle, { backgroundColor: color }]}
          onPress={() => handleColorSelection(color)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  label: {
    fontFamily: "open-bold",
    marginRight: 8,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 4,
  },
});

export default ColorSelector;
