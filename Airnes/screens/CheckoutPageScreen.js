import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { GlobalStyles } from "../constants/style";
import { useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { APIRequest, API_URL } from "../components/util/helper";

function CheckoutPageScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});

  const fetchOrder = async () => {
    try {
      const result = await APIRequest("get", "Orders/Current");
      setOrder(result.data);

      const products_result = await APIRequest(
        "get",
        `ProductOrder?OrderId=${result.data.OrderId}`
      );
      const newProducts = products_result.return.map((product) => ({
        id: product.Product.ProductId,
        title: product.Product.Name,
        price: product.Product.Price,
        quantity: product.Quantity,
        image: product.Product.Pictures?.[0]?.Link
          ? `${API_URL}/${product.Product.Pictures[0].Link}`
          : "/image/placeholder.webp",
      }));

      setProducts(newProducts);
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const fetchSavedAddresses = async () => {
    try {
      const result = await APIRequest("get", "Address");
      setSavedAddresses(
        result.return.map((address) => ({
          id: address.AddressId,
          firstName: address.Firstname,
          lastName: address.Lastname,
          address1: address.Address1,
          address2: address.Address2,
          city: address.City,
          zip: address.ZipCode,
          country: address.Country,
          region: address.Region,
          phone: address.Phone,
          temporary: address.Temporary,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch saved addresses:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
      fetchSavedAddresses();
    }, [])
  );

  const handleSubmit = async () => {
    let addressId = selectedAddressId;
    if (!addressId) {
      try {
        const result = await APIRequest("post", "Address", {
          Firstname: firstName,
          Lastname: lastName,
          Address1: address1,
          Address2: address2,
          City: city,
          ZipCode: postalCode,
          Country: country,
          Region: region,
          Phone: phoneNumber,
          Temporary: !saveAddress,
        });
        addressId = result.address.AddressId;
      } catch (error) {
        console.error("Failed to save address:", error);
        return;
      }
    }
  
    try {
      await APIRequest("post", "Orders/SetAddress", {
        OrderId: order.OrderId,
        AddressId: addressId
      });

      handleCheckout();
    } catch (error) {
      Alert.alert("Checkout error", error.message);
    }
  };
  
  const handleCheckout = async () => {
    try {
    const response = await APIRequest("post", "create-checkout-session");
    const checkoutUrl = response.url;

    navigation.navigate("StripeCheckout", { url: checkoutUrl, orderId: order.OrderId });
    } catch (error) {
      Alert.alert("Checkout error", error.message);
    }
  };
  
  const handleSavedAddressSelect = (value) => {
    setSelectedAddressId(value);

    if (value) {
      const selectedAddress = savedAddresses.find((addr) => addr.id === value);
      if (selectedAddress) {
        setFirstName(selectedAddress.firstName);
        setLastName(selectedAddress.lastName);
        setAddress1(selectedAddress.address1);
        setAddress2(selectedAddress.address2);
        setCity(selectedAddress.city);
        setPostalCode(selectedAddress.zip);
        setCountry(selectedAddress.country);
        setRegion(selectedAddress.region);
        setPhoneNumber(selectedAddress.phone);
      }
    } else {
      setFirstName("");
      setLastName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setRegion("");
      setPhoneNumber("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Payment Information</Text>
        <Text style={styles.addTitle}>Existing Address</Text>
        <RNPickerSelect
          onValueChange={handleSavedAddressSelect}
          items={savedAddresses.map((address) => ({
            label: `${address.firstName} ${address.lastName}, ${address.address1}, ${address.city}`,
            value: address.id
          }))}
          placeholder={{ label: "Select a saved address", value: null }}
          style={pickerStyles}
        />
        {!selectedAddressId && (
          <>
          <Text style={styles.addTitle}>Add New Address</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Address 1"
              value={address1}
              onChangeText={setAddress1}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Address 2"
              value={address2}
              onChangeText={setAddress2}
              required={false}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Region"
              value={region}
              onChangeText={setRegion}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="numeric"
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              required={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="numeric"
              required={true}
              minLength={10}
              maxLength={10}
            />
          </>
        )}
        <Button
          title="Submit"
          onPress={handleSubmit}
          color={GlobalStyles.colors.primary500}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "open-bold",
    textAlign: "center",
    marginBottom: 30,
  },
  addTitle: {
    fontSize: 20,
    fontFamily: "open-bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    height: 40,
    fontFamily: "shinko-font",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  error: {
    color: GlobalStyles.colors.error50,
    fontSize: 12,
    marginBottom: 5,
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    fontFamily: "shinko-font",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    marginRight: 5,
  },
  inputAndroid: {
    height: 50,
    fontFamily: "shinko-font",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    marginRight: 5,
  },
});

export default CheckoutPageScreen;
