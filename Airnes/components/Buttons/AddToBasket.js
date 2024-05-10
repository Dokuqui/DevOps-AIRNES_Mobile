import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AddToBasketButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.buttonText}>Add to Basket</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4A460",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "open-bold",
  },
});

export default AddToBasketButton;
