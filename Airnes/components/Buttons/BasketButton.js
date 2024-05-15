import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

const BasketButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "open-bold",
    textAlign: "center",
    color: GlobalStyles.colors.textWhite,
  },
});

export default BasketButton;
