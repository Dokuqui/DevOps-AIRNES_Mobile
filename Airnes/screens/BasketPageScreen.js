import { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import ProductList from "../components/ProductList/ProductList";
import BasketButton from "../components/Buttons/BasketButton";
import { clearBasket, removeProduct } from "../store/basket";
import { GlobalStyles } from "../constants/style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { APIRequest, API_URL } from "../components/util/helper";
import LoadingOverlay from "../components/UI/loading-overlay";

function BasketScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const result = await APIRequest("get", "Orders/Current");
      setOrder(result.data);

      const products_result = await APIRequest(
        "get",
        `ProductOrder?OrderId=${result.data.OrderId}`
      );
      const newProducts = products_result.return.map((product) => ({
        id: product.Product.ProductId,
        title: product.Product.Name,
        price: product.Product.Price,
        quantity: product.Quantity,
        image: product.Product.Pictures?.[0]?.Link
          ? `${API_URL}/${product.Product.Pictures[0].Link}`
          : "/image/placeholder.webp",
      }));

      setProducts(newProducts);
    } catch (error) {
      console.error("API request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, [])
  );

  const selectBasketProduct = (state) => state.basketProduct;

  const selectTotalQuantity = createSelector(
    selectBasketProduct,
    (basketProduct) => basketProduct.totalQuantity
  );

  const selectTotalPrice = createSelector(
    selectBasketProduct,
    (basketProduct) => basketProduct.totalPrice
  );

  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  if (isLoading || !order) {
    return <LoadingOverlay message="Loading information..." />
  }

  if (products.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Your basket is empty!</Text>
      </View>
    );
  };


  const handleDeleteSwipe = async (productId) => {
    setIsLoading(true);
    try {
      const response = await APIRequest(
        "delete",
        `ProductOrder?OrderId=${order.OrderId}&ProductId=${productId}`
      );
      if (response.success) {
        console.log("Product successfully deleted from order.");
        dispatch(removeProduct(productId));
      } else {
        console.error("Failed to delete product:", response.error);
      }
      await fetchOrder();
    } catch (error) {
      console.error("Failed to delete product from order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      const response = await APIRequest(
        "delete",
        `ProductOrder?OrderId=${order.OrderId}`
      );
      setProducts([]);
      if (response.success) {
        console.log("Product successfully deleted from order.");
      } else {
        console.error("Failed to delete product:", response.error);
      }
      dispatch(clearBasket());
      await fetchOrder();
    } catch (error) {
      console.error("Failed to delete product from order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderPress = () => {
    navigation.navigate("Checkout Payment");
  };

  return (
    <>
      <ProductList items={products} onDelete={handleDeleteSwipe} />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total Quantity:</Text>
          <Text style={styles.summaryValue}>{totalQuantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total Price:</Text>
          <Text style={styles.summaryValue}>€{totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <BasketButton
            title="Cancel"
            style={styles.buttonCancel}
            onPress={handleDeleteClick}
          />
          <BasketButton
            title="Order"
            style={styles.buttonOrder}
            onPress={handleOrderPress}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "open-bold",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 18,
    fontFamily: "open-bold",
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: "shinko-font",
    color: GlobalStyles.colors.primary900,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 20,
  },
  buttonOrder: {
    backgroundColor: GlobalStyles.colors.accent500,
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: GlobalStyles.colors.error500,
    marginLeft: 10,
  }
});

export default BasketScreen;
