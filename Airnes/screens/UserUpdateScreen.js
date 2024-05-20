import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../constants/style";

function UpdateUserScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditCard, setCreditCard] = useState("");

  function handleUpdate() {
    console.log("Updated user info:", {
      name,
      email,
      password,
      address,
      creditCard,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Credit Card"
        value={creditCard}
        onChangeText={setCreditCard}
      />
      <TouchableOpacity style={styles.customButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UpdateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontFamily: "open-bold",
    marginVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
    fontFamily: "shinko-font",
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  customButton: {
    backgroundColor: GlobalStyles.colors.primary200,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "open-bold",
  },
});
