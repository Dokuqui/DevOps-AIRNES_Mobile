import { FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGrid";
import { GlobalStyles } from "../constants/style";

function CategoryPageScreen({ navigation }) {
  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Product Overview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile title={itemData.item.title} onPress={pressHandler} />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoryPageScreen;
