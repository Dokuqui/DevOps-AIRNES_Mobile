import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

import { PRODUCTS } from "../data/dummy-data";
import ProductDetails from "../components/ProductDetails";
import Subtitle from "../components/ProductDetails/Subtitle";
import List from "../components/ProductDetails/List";
import IconButton from "../components/Buttons/IconButton";
import AvailabilityMessage from "../components/Product/Available";
import ColorSelector from "../components/Product/ColorSelector";
import QuantitySelect from "../components/Product/Quantity";
import AddToBasketButton from "../components/Buttons/AddToBasket";
import { addFavorite, removeFavorite } from "../store/favorites";
import { GlobalStyles } from "../constants/style";

function ProductDetailScreen({ route, navigation }) {
  const favoriteProductIds = useSelector((state) => state.favoriteProduct.ids);
  const dispatch = useDispatch();

  const productId = route.params.productId;

  const selectedProduct = PRODUCTS.find((product) => product.id === productId);

  const productIsFavorite = favoriteProductIds.includes(productId);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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

  function handleColorSelection(color) {
    setSelectedColor(color);
  }

  function handleAddToBasket() {
    const productToAddToBasket = {
      ...selectedProduct,
      color: selectedColor,
      quantity: selectedQuantity,
    };
    console.log("Product added to basket:", productToAddToBasket);
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={selectedProduct.image} />
      <Text style={styles.title}>{selectedProduct.name}</Text>
      <ProductDetails
        price={selectedProduct.price}
        brand={selectedProduct.brand}
        textStyle={styles.detailText}
        boxStyle={styles.box}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Name</Subtitle>
          <List data={[selectedProduct.name]} />
          <Subtitle>Description</Subtitle>
          <List data={[selectedProduct.description]} />
        </View>
      </View>
      <View style={styles.selectors}>
        <QuantitySelect
          selectedQuantity={selectedQuantity}
          onSelectQuantity={setSelectedQuantity}
        />
        {selectedProduct.colors && (
          <ColorSelector
            colors={selectedProduct.colors}
            selectedColor={selectedColor}
            onSelectColor={handleColorSelection}
          />
        )}
        <AvailabilityMessage available={selectedProduct.isAvailable} />
        <View style={styles.addBasket}>
          <AddToBasketButton onPress={handleAddToBasket} />
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
    fontFamily: "open-bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },
  detailText: {
    fontFamily: "shinko-font",
    fontSize: 18,
    marginHorizontal: "auto",
  },
  box: {
    marginHorizontal: "auto",
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
  selectors: {
    marginVertical: 20,
  },
  addBasket: {
    alignItems: "center",
    marginHorizontal: "auto",
    justifyContent: "center",
    width: 300,
    marginVertical: 20,
  },
});
