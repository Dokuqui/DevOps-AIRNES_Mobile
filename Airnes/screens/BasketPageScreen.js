import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { PRODUCTS } from "../data/dummy-data";
import ProductList from "../components/ProductList/ProductList";
import BasketButton from "../components/Buttons/BasketButton";
import { clearBasket } from "../store/basket";
import { GlobalStyles } from "../constants/style";
import { useNavigation } from "@react-navigation/native";

function BasketScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const basketProductIds = useSelector((state) => state.basketProduct.ids);

  const basketProducts = PRODUCTS.filter((product) =>
    basketProductIds.includes(product.id)
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

  if (basketProducts.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>Your basket is empty!</Text>
      </View>
    );
  }

  const handleOrderPress = () => {
    navigation.navigate("Checkout Payment");
  };

  return (
    <>
      <ProductList items={basketProducts} />
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
          <BasketButton title="Cancel" style={styles.buttonCancel} onPress={() => dispatch(clearBasket())} />
          <BasketButton title="Order" style={styles.buttonOrder} onPress={handleOrderPress} />
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
