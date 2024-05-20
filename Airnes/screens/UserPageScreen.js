import { useContext, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/style";

function UserScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Springfield, USA",
    creditCard: "1234567812345678",
  };

  const orderHistory = [
    { id: "1", date: "2024-01-15", amount: "$199.99", product: "sofa", quantity: "2" },
    { id: "2", date: "2024-02-20", amount: "$399.99", product: "sofa", quantity: "2"  },
    { id: "3", date: "2024-01-15", amount: "$199.99", product: "sofa", quantity: "2"  },
    { id: "4", date: "2024-02-20", amount: "$399.99", product: "sofa", quantity: "2"  },
    { id: "5", date: "2024-01-15", amount: "$199.99", product: "sofa", quantity: "2"  },
    { id: "6", date: "2024-02-20", amount: "$399.99", product: "sofa", quantity: "2"  },
    { id: "7", date: "2024-01-15", amount: "$199.99", product: "sofa", quantity: "2"  },
    { id: "8", date: "2024-02-20", amount: "$399.99", product: "sofa", quantity: "2"  },
  ];

  function navigateToUpdateScreen() {
    navigation.navigate("User Update");
  }

  function logoutHandler() {
    authCtx.logout();
    navigation.navigate("Home");
  }

  function maskCreditCard(cardNumber) {
    return cardNumber.slice(0, -4).replace(/./g, '*') + cardNumber.slice(-4);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="log-out-outline"
          size={30}
          color="white"
          onPress={logoutHandler}
          style={{ marginRight: 15 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <Text style={styles.textTitle}>Name:</Text>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.textTitle}>Email:</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.textTitle}>Address:</Text>
      <Text style={styles.text}>{user.address}</Text>
      <Text style={styles.textTitle}>Credit Card:</Text>
      <Text style={styles.text}>{maskCreditCard(user.creditCard)}</Text>

      <Text style={styles.header}>Order History</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Amount: {item.amount}</Text>
            <Text style={styles.text}>Details: {item.product}</Text>
            <Text style={styles.text}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.customButton}
        onPress={navigateToUpdateScreen}
      >
        <Text style={styles.buttonText}>Update Personal Information</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontFamily: "open-bold",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textTitle: {
    fontFamily: "open-bold",
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontFamily: "shinko-font",
    fontSize: 18,
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  customButton: {
    backgroundColor: GlobalStyles.colors.primary700,
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

export default UserScreen;
