import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import ProductDetails from "../ProductDetails";
import { useNavigation } from "@react-navigation/native";

function ProductItem({ id, name, price, brand, image }) {
  const navigation = useNavigation();

  function selectProductItemHandler() {
    navigation.navigate("Product Detail", {
      productId: id,
    });
  }

  return (
    <View style={styles.productItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectProductItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={image} style={styles.image} />
            <Text style={styles.title}>{name}</Text>
          </View>
          <ProductDetails price={price} brand={brand} />
        </View>
      </Pressable>
    </View>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  productItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "open-bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
