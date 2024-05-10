import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../Buttons/QuantityButton"

function QuantitySelect() {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.quantityContainer}>
      <Text style={styles.label}>Quantity:</Text>
      <CustomButton title="-" onPress={decrementQuantity} />
      <Text style={styles.quantity}>{quantity}</Text>
      <CustomButton title="+" onPress={incrementQuantity} />
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
