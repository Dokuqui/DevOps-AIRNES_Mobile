import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import ProductDetails from "../ProductDetails";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";

function ProductItem({ id, name, price, image, onDelete, isSwipeable }) {
  const navigation = useNavigation();

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(id)}
      >
        <Ionicons name="trash" size={24} color="white" />
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  function selectProductItemHandler() {
    navigation.navigate("Product Detail", {
      productId: id,
    });
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={isSwipeable ? renderRightActions : null}>
        <View style={styles.productItem}>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
            onPress={selectProductItemHandler}
          >
            <View style={styles.innerContainer}>
              <View>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={styles.title}>{name}</Text>
              </View>
              <ProductDetails price={price} />
            </View>
          </Pressable>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
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
  deleteButton: {
    backgroundColor: GlobalStyles.colors.error500,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginVertical: 16,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "open-bold",
  },
});
