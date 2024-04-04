import { View, FlatList, StyleSheet } from "react-native";

import ProductItem from "./ProductItem";

function ProductList({ items }) {
  function renderProductItem(itemData) {
    const item = itemData.item;
    const productItemProps = {
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      brand: item.brand,
      description: item.description,
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
