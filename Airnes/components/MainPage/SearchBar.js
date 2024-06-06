import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../../constants/style";

function SearchBar({ onSearch, query }) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  function searchHandler() {
    onSearch(searchQuery);
  }

  function handleInputChange(text) {
    setSearchQuery(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search product"
        value={searchQuery}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.button} onPress={searchHandler}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.gray700,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: GlobalStyles.colors.accent500,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: GlobalStyles.colors.textWhite,
    fontFamily: "open-bold",
  },
});
