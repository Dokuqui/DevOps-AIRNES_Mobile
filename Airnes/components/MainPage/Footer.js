import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
  const year = new Date().getFullYear();

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
      <View>
        <Text style={styles.copyright}>
          © {year} Company, Inc. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  containerLogo: {
    flexDirection: "row",
  },
  button: {
    padding: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "open-bold",
    color: "#333",
  },
  copyright: {
    fontFamily: "shinko-font",
  },
});

export default Footer;
