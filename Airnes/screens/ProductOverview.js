import { useLayoutEffect } from "react";

import { CATEGORIES, PRODUCTS } from "../data/dummy-data";
import ProductList from "../components/ProductList/ProductList";

function ProductOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedProducts = PRODUCTS.filter((productItem) => {
    return productItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);
  
  return <ProductList items={displayedProducts} />
}

export default ProductOverviewScreen;