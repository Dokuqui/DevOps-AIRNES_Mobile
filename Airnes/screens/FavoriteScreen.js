import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

import ProductList from "../components/ProductList/ProductList";
import { PRODUCTS } from "../data/dummy-data";
import { GlobalStyles } from "../constants/style";

function FavoritesScreen() {
  const favoriteProductIds = useSelector((state) => state.favoriteProduct.ids);

  const favoriteProduct = PRODUCTS.filter((product) =>
    favoriteProductIds.includes(product.id)
  );

  if (favoriteProduct.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite product yet !</Text>
      </View>
    );
  }

  return <ProductList items={favoriteProduct} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
