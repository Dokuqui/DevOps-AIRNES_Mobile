import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Image, Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import { APIRequest, API_URL } from "../components/util/helper";
import ProductDetails from "../components/ProductDetails";
import Subtitle from "../components/ProductDetails/Subtitle";
import List from "../components/ProductDetails/List";
import AvailabilityMessage from "../components/Product/Available";
import RNPickerSelect from "react-native-picker-select";
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
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await APIRequest(
          "get",
          `Products?ProductId=${productId}`
        );

        console.log(result)

        if (!result.success || !result.return) {
          console.error("Error fetching product:", result.error);
          return;
        }

        const productData = result.return;
        const images = productData.Pictures.map(
          (picture) => `${API_URL}/${picture.Link}`
        );

        const materialsResult = await APIRequest(
          "get",
          `ProductMaterial?ProductId=${productId}`
        );

        let materials = [];
        if (materialsResult.success) {
          materials = materialsResult.return.map((material) => ({
            label: material.Label,
            value: material.MaterialId,
          }));
        }

        setSelectedProduct({
          id: productData.ProductId,
          title: productData.Name,
          availability: productData.Stock > 0,
          description: productData.Description,
          price: productData.Price,
          materials: materials,
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
    return <LoadingOverlay message="Loading information..." />;
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

  function handleMaterialSelection(material) {
    setSelectedMaterial(material);
  }

  async function handleAddToBasket() {
    if (!selectedMaterial) {
      Alert.alert("Please select material.");
      return;
    }

    const productToAddToBasket = {
      ProductId: selectedProduct.id,
      MaterialId: selectedMaterial,
      Quantity: selectedQuantity,
      Price: selectedProduct.price,
    };

    try {
      const resultAction = await dispatch(addBasketItem(productToAddToBasket));
      const response = unwrapResult(resultAction);

      if (response.ProductId && response.Quantity) {
        Alert.alert("Success", "Product added to basket.");
      } else {
        Alert.alert(
          "Error",
          response && response.error
            ? response.error.toString()
            : "Failed to add product to basket."
        );
      }
    } catch (error) {
      if (error.message) {
        Alert.alert("Error", error.message.toString());
      } else if (typeof error === "object") {
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
      <View>
        <View style={styles.selectors}>
          <QuantitySelect
            selectedQuantity={selectedQuantity}
            onSelectQuantity={handleQuantitySelection}
          />
          {selectedProduct.materials.length > 0 && (
            <RNPickerSelect
              onValueChange={handleMaterialSelection}
              items={selectedProduct.materials}
              placeholder={{ label: "Select material : ", value: null }}
              style={pickerStyles}
              testID="material-picker"
            />
          )}
        </View>
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
    textAlign: "center",
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
    alignItems: "center",
    marginHorizontal: 50,
  },
  addBasket: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontFamily: "shinko-font",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center", // Center text within the picker
  },
  inputAndroid: {
    height: 50,
    fontFamily: "shinko-font",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center", // Center text within the picker
  },
});
