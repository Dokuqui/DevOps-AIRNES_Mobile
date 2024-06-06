import { useEffect, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { APIRequest, API_URL } from "../components/util/helper";
import ProductDetails from "../components/ProductDetails";
import Subtitle from "../components/ProductDetails/Subtitle";
import List from "../components/ProductDetails/List";
import IconButton from "../components/Buttons/IconButton";
import AvailabilityMessage from "../components/Product/Available";
import ColorSelector from "../components/Product/ColorSelector";
import QuantitySelect from "../components/Product/Quantity";
import AddToBasketButton from "../components/Buttons/AddToBasket";
import Footer from "../components/MainPage/Footer";
import { addBasketItem } from "../store/basket";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingOverlay from "../components/UI/loading-overlay";

function ProductDetailScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const productId = route.params.productId;


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await APIRequest("get", `Products?ProductId=${productId}`);

        if (!result.success || !result.return) {
          console.error("Error fetching product:", result.error);
          return;
        }

        const productData = result.return;
        const images = productData.Pictures.map(
          (picture) => `${API_URL}/${picture.Link}`
        );

        setSelectedProduct({
          id: productData.ProductId,
          title: productData.Name,
          availability: productData.Stock > 0,
          description: productData.Description,
          price: productData.Price,
          colors: ["red", "blue", "green"],
          images: images,
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (isLoading) {
    return <LoadingOverlay message="Loading information..." />
  }

  if (!selectedProduct) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading product.</Text>
      </View>
    );
  }

  function handleQuantitySelection(quantity) {
    setSelectedQuantity(quantity);
  }

  function handleColorSelection(color) {
    setSelectedColor(color);
  }

  async function handleAddToBasket() {
    if (!selectedColor) {
      Alert.alert("Please select a color.");
      return;
    }
  
    const productToAddToBasket = {
      ProductId: selectedProduct.id,
      Quantity: selectedQuantity,
      Price: selectedProduct.price
    };
  
    try {
      const resultAction = await dispatch(addBasketItem(productToAddToBasket));
      const response = unwrapResult(resultAction);
  
      if (response.ProductId && response.Quantity) {
        Alert.alert("Success", "Product added to basket.");
      } else {
        Alert.alert("Error", response && response.error ? response.error.toString() : "Failed to add product to basket.");
      }      
    } catch (error) {
      if (error.message) {
        Alert.alert("Error", error.message.toString());
      } else if (typeof error === 'object') {
        Alert.alert("Error", JSON.stringify(error));
      } else {
        Alert.alert("Error", error.toString());
      }
    }
  }
  

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedProduct.images[0] }} />
      <Text style={styles.title}>{selectedProduct.name}</Text>
      <ProductDetails
        price={selectedProduct.price}
        textStyle={styles.detailText}
        boxStyle={styles.box}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Title</Subtitle>
          <List data={[selectedProduct.title]} key="title" />
          <Subtitle>Description</Subtitle>
          <List data={[selectedProduct.description]} key="description" />
        </View>
      </View>
      <View style={styles.selectors}>
        <QuantitySelect
          selectedQuantity={selectedQuantity}
          onSelectQuantity={handleQuantitySelection}
        />
        {selectedProduct.colors && (
          <ColorSelector
            colors={selectedProduct.colors}
            selectedColor={selectedColor}
            onSelectColor={handleColorSelection}
          />
        )}
        <AvailabilityMessage stock={selectedProduct.availability} />
        <View style={styles.addBasket}>
          <AddToBasketButton onPress={handleAddToBasket} />
        </View>
        <Footer />
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
