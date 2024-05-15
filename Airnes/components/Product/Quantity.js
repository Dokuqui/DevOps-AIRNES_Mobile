import { StyleSheet, Text, View } from "react-native";
import QuantityButton from "../Buttons/QuantityButton"

function QuantitySelect({ selectedQuantity, onSelectQuantity }) {
  const handleQuantityChange = (quantity) => {
    onSelectQuantity(quantity);
  };

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.label}>Quantity:</Text>
      <QuantityButton title="-" onPress={() => handleQuantityChange(selectedQuantity - 1)} />
      <Text style={styles.quantity}>{selectedQuantity}</Text>
      <QuantityButton title="+" onPress={() => handleQuantityChange(selectedQuantity + 1)} />
    </View>
  );
}

export default QuantitySelect;

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  label: {
    fontFamily: "open-bold",
    marginRight: 8,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: "open-bold",
  },
});
