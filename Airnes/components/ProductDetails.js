import { View, Text, StyleSheet } from "react-native";

function ProductDetails({
  price,
  brand,
  style,
  textStyle,
}) {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailItem, textStyle]}>{price} $</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {brand.toUpperCase()}
      </Text>
    </View>
  );
}

export default ProductDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
