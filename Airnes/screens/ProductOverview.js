import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { APIRequest, API_URL } from "../components/util/helper";
import ProductList from "../components/ProductList/ProductList";
import LoadingOverlay from "../components/UI/loading-overlay";

function ProductOverviewScreen({ route }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const categoryId = route.params.categoryId;
      try {
        const result = await APIRequest("get", `ProductCategory?CategoryId=${categoryId}`);
        const newProducts = result.return.Products.map((product) => ({
          id: product.ProductId,
          title: product.Name,
          description: product.Description,
          image: product.Pictures?.[0]?.Link ? `${API_URL}/${product.Pictures[0].Link}` : "/image/placeholder.webp",
          price: product.Price,
          quantity: product.Stock,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [route.params.categoryId]);

  if (isLoading) {
    return <LoadingOverlay message="Loading information..." />
  }

  return (
    <View style={{ flex: 1 }}>
      {products.length > 0 ? (
        <ProductList items={products} />
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No products found for this category.</Text>
        </View>
      )}
    </View>
  );
}

export default ProductOverviewScreen;