import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

const AddToBasketButton = ({ onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID} style={styles.container}>
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
    color: GlobalStyles.colors.textWhite,
    fontSize: 14,
    fontFamily: "open-bold",
  },
});

export default AddToBasketButton;
