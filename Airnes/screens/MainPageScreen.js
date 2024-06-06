import { StyleSheet, View, Dimensions, ScrollView, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import CarrouselItem from "../components/MainPage/CarrouselItem";
import SearchBar from "../components/MainPage/SearchBar";
import Recommendations from "../components/MainPage/Recommendations";
import Feedback from "../components/MainPage/FeedBackItem";
import Footer from "../components/MainPage/Footer";
import { carouselData } from "../data/carrouselData";
import { feedbackData } from "../data/feedback";
import { fetchProducts } from "../store/productSlice";
import LoadingOverlay from "../components/UI/loading-overlay";

function MainPageScreen() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const navigation = useNavigation();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <LoadingOverlay message="Loading information..." />
  }

  if (status === "failed") {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const recommendedProducts = products.slice(0, 5);

  const width = Dimensions.get("window").width;

  function renderItem({ item }) {
    return <CarrouselItem item={item} />;
  }

  function handleSearch(query) {
    console.log("Search query:", query);
    setQuery(query);
  }

  function navigateToProductHandler(productId) {
    navigation.navigate("Product Detail", { productId });
  }

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={carouselData}
            renderItem={renderItem}
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            scrollAnimationDuration={5000}
          />
        </View>
        <SearchBar onSearch={handleSearch} query={query} />
        <View style={styles.productListContainer}>
          <Recommendations
            recommendedProducts={recommendedProducts}
            onPress={(productId) => navigateToProductHandler(productId)}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.feedbackContainer}>
            <Feedback feedbackData={feedbackData} />
          </View>
        </ScrollView>
        <Footer />
      </View>
    </ScrollView>
  );
}

export default MainPageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    height: Dimensions.get("window").width / 2,
  },
  productListContainer: {
    flex: 1,
  },
  feedbackContainer: {
    marginBottom: 20,
  },
});
