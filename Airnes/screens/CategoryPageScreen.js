import { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { APIRequest } from "../components/util/helper";
import CategoryGridTile from "../components/CategoryGrid";
import LoadingOverlay from "../components/UI/loading-overlay";

function CategoryPageScreen({ navigation }) {
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubcategories = async () => {
    try {
      let result = await APIRequest("get", "CategorieRoom");

      let allSubcategories = result.return.flatMap((room) =>
        room.Categories.map((category) => ({
          id: category.CategoryId,
          name: category.Name,
        }))
      );

      let uniqueSubcategories = allSubcategories.filter(
        (category, index, self) =>
          index ===
          self.findIndex((c) => c.id === category.id)
      );

      setSubcategories(uniqueSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  function renderSubcategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Product Overview", {
        categoryId: itemData.item.id,
      });
    }

    return (
      <CategoryGridTile title={itemData.item.name} onPress={pressHandler} />
    );
  }

  if (isLoading) {
    return <LoadingOverlay message="Loading information..." />
  }

  if (subcategories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No subcategories found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={subcategories}
      keyExtractor={(item) => item.id}
      renderItem={renderSubcategoryItem}
      numColumns={2}
    />
  );
}

export default CategoryPageScreen;