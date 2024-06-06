import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
} from "react-native";

import { GlobalStyles } from "../../constants/style";


const Recommendations = ({ recommendedProducts, onPress, image }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Products:</Text>
      <View style={styles.productContainer}>
        {recommendedProducts.map((product, index) => (
          <Pressable
            key={index}
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonPressed : null,
            ]}
            onPress={() => onPress(product.id)} 
          >
            <View style={styles.productBox}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <Text style={styles.productName}>{product.title}  -  {product.price}€</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Recommendations;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: GlobalStyles.colors.gray500,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontFamily: "open-bold",
    marginBottom: 8,
  },
  productContainer: {
    flexDirection: "column", 
    justifyContent: "space-between",
    padding: 6,
  },
  productBox: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 10,
    padding: 12,
    width: 350,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontFamily: "shinko-font",
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: "center",
    alignItems: "center"
  },
});
