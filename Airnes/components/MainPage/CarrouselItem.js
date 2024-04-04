import { Image, View, StyleSheet } from "react-native";


function CarrouselItem({ item }) {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );
}

export default CarrouselItem;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginTop: 10,
  },
});
