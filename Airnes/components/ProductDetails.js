import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/style";

function ProductDetails({ price, style, textStyle, boxStyle }) {
  return (
    <View style={[styles.detailsContainer, boxStyle]}>
      <View style={[styles.details, style]}>
        <Text style={[styles.detailItem, textStyle]}>{price} €</Text>
      </View>
    </View>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 8,
    borderColor: GlobalStyles.colors.primary100,
    borderWidth: 1,
    padding: 8,
  },
  details: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
  },
  detailItem: {
    marginVertical: 4,
    fontSize: 18,
    fontFamily: "shinko-font",
    justifyContent: "center",
    alignItems: "center"
  },
});
