import { View, FlatList, StyleSheet } from "react-native";

import ProductItem from "./ProductItem";
import { useRoute } from "@react-navigation/native";

function ProductList({ items, onDelete }) {
  const route = useRoute();

  function renderProductItem(itemData) {
    const item = itemData.item;
    const productItemProps = {
      id: item.id,
      name: item.title,
      image: item.image,
      price: item.price,
      description: item.description,
      onDelete: onDelete,
      isSwipeable: route.name === "Basket",
    };

    return <ProductItem {...productItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
      />
    </View>
  );
}

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
