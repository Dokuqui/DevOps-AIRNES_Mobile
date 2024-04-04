import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useState, useEffect } from "react";

import CarrouselItem from "../components/MainPage/CarrouselItem";
import SearchBar from "../components/MainPage/SearchBar";
import Recommendations from "../components/MainPage/Recommendations";
import Feedback from "../components/MainPage/FeedBackItem";
import Footer from "../components/MainPage/Footer";
import { carouselData } from "../data/carrouselData";
import { feedbackData } from "../data/feedback";
import { CATEGORIES, PRODUCTS } from "../data/dummy-data";
import { GlobalStyles } from "../constants/style";

function MainPageScreen() {
  const [query, setQuery] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    setRecommendedProducts(PRODUCTS.slice(0, 5));
  }, []);

  const width = Dimensions.get("window").width;

  function renderItem({ item }) {
    return <CarrouselItem item={item} />;
  }

  function handleSearch(query) {
    console.log("Search query:", query);
    setQuery(query);
  }

  function pressHandler() {}

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
            onPress={pressHandler}
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
    backgroundColor: GlobalStyles.colors.primary700
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
