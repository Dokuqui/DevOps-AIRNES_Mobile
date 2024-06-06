import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";

function AvailabilityMessage({ stock }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.label}>
        Available:{" "}
        <Text
          style={[
            styles.availableText,
            stock > 0 ? styles.availableColor : styles.outOfStockColor,
          ]}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </Text>
      </Text>
    </View>
  );
}

export default AvailabilityMessage;

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  label: {
    fontFamily: "shinko-font",
  },
  availableText: {
    fontFamily: "open-bold",
  },
  availableColor: {
    color: GlobalStyles.colors.available,
  },
  outOfStockColor: {
    color: GlobalStyles.colors.outOfStock,
  },
});
