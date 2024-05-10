import { Text, View, StyleSheet } from "react-native";

function List({ data }) {
  return data.map((dataPoint) => (
    <View key={dataPoint} style={styles.lisItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  lisItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
    fontFamily: "shinko-font",
    fontSize: 16,
  },
});
