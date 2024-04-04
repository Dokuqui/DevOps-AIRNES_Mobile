import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

import { PRODUCTS } from "../data/dummy-data";
import ProductDetails from "../components/ProductDetails";
import Subtitle from "../components/ProductDetails/Subtitle";
import List from "../components/ProductDetails/List";
import IconButton from "../components/Buttons/IconButton";
import { addFavorite, removeFavorite } from "../store/favorites"
import { GlobalStyles } from "../constants/style";

function ProductDetailScreen({ route, navigation }) {
  const favoriteProductIds = useSelector((state) => state.favoriteProduct.ids);
  const dispatch = useDispatch();

  const productId = route.params.productId;

  const selectedProduct = PRODUCTS.find((product) => product.id === productId);

  const productIsFavorite = favoriteProductIds.includes(productId);

  function changeFavoriteStatusHandler() {
    if (productIsFavorite) {
      dispatch(removeFavorite({ id: productId }));
    } else {
      dispatch(addFavorite({ id: productId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={productIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={selectedProduct.image} />
      <Text style={styles.title}>{selectedProduct.title}</Text>
      <ProductDetails
        price={selectedProduct.price}
        brand={selectedProduct.brand}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Name</Subtitle>
          <List data={[selectedProduct.name]} />
          <Subtitle>Description</Subtitle>
          <List data={[selectedProduct.description]} />
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
