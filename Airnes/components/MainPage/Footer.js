import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-twitter" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-instagram" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="logo-facebook" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  containerLogo: {
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Footer;
