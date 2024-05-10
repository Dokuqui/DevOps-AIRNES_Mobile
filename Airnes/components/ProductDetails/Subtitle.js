import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitleContainer: {
    padding: 6,
    margin: 4,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: GlobalStyles.colors.primary900,
    borderBottomWidth: 2,
  },
  subtitle: {
    color: GlobalStyles.colors.primary500,
    fontSize: 20,
    fontFamily: "open-bold",
    textAlign: "center",
  },
});
