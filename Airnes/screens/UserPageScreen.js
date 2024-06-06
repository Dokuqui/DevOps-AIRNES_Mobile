import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/style";
import { getUserInfo } from "../components/util/auth";
import { APIRequest } from "../components/util/helper";
import LoadingOverlay from "../components/UI/loading-overlay";

function UserScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setIsLoading(false);
      };

      fetchUserData();
    }, [])
  );

  const fetchOrderHistory = async () => {
    let result = await APIRequest("get", "Orders");
    let newOrderHistory = [];

    for (let i = 0; i < result.data.length; i++) {
      let order = result.data[i];
      let products = await APIRequest(
        "get",
        `ProductOrder?OrderId=${order.OrderId}`
      );
      let price = products.return.reduce(
        (acc, product) => acc + product.Product.Price * product.Quantity,
        0
      );

      newOrderHistory.push({
        id: order.OrderId,
        date: order.OrderDate,
        amount: `$${price.toFixed(2)}`,
        quantity: products.return.reduce(
          (acc, product) => acc + product.Quantity,
          0
        ),
      });
    }

    setOrderHistory(newOrderHistory.reverse());
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchOrderHistory().then(() => setIsLoading(false));
    }, [])
  );

  function navigateToUpdateScreen() {
    navigation.navigate("User Update");
  }

  function logoutHandler() {
    authCtx.logout();
    navigation.navigate("Home");
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

  if (isLoading) {
    return <LoadingOverlay message="Loading information..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <Text style={styles.textTitle}>Name:</Text>
      <Text style={styles.text}>
        {user?.FirstName} {user?.LastName}
      </Text>
      <Text style={styles.textTitle}>Email:</Text>
      <Text style={styles.text}>{user?.Mail}</Text>

      <Text style={styles.header}>Order History</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Amount: {item.amount}</Text>
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
