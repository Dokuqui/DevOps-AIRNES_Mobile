import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { GlobalStyles } from "../constants/style";
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";

function CheckoutPageScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();

  const months = [
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];

  const years = [];
  for (
    let i = new Date().getFullYear();
    i < new Date().getFullYear() + 10;
    i++
  ) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  const handleSubmitAlert = (navigation) => {
    Alert.alert(
      'Thank you for your purchase!',
      'Your order has been successfully submitted.',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home')
        }
      ]
    )
  }  

  const handleSubmit = () => {
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Address: ", address);
    console.log("City: ", city);
    console.log("Postal Code: ", postalCode);
    console.log("Country: ", country);
    console.log("Credit Card Number: ", creditCardNumber);
    console.log("Expiry Month: ", expiryMonth);
    console.log("Expiry Year: ", expiryYear);
    console.log("CVV: ", cvv);

    setIsSubmitted(true);

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
    }

    if (cvv.length !== 3 || cvv.length > 3 || cvv.length < 3) {
      setCvvError("CVV should have 3 digits");
    }

    if (creditCardNumber.length !== 16 || creditCardNumber.length > 16 || creditCardNumber.length < 16) {
      setCreditCardError("CVV should have 16 digits");
    }

    if (!cvvError && !emailError && !creditCardError) {
      handleSubmitAlert(navigation);
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function isValidEmail(email) {
    return emailRegex.test(email);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          required={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          required={true}
          onChangeText={(text) => {
            setEmail(text);
            if (!isValidEmail(text)) {
              setEmailError("Please enter a valid email address");
            } else {
              setEmailError(null);
            }
          }}
        />
        {emailError && (
          <Text style={styles.error}>You should enter valid email!</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          required={true}
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
          placeholder="Credit Card Number"
          value={creditCardNumber}
          onChangeText={setCreditCardNumber}
          keyboardType="numeric"
          required={true}
          minLength={16}
          maxLength={16}
        />
        {creditCardError && (
          <Text style={styles.error}>
            Credit card number should have 16 digits
          </Text>
        )}
        <View style={styles.inputContainer}>
          <RNPickerSelect
            style={pickerStyles}
            placeholder={{ label: "Expiry Month", value: null }}
            onValueChange={(value) => setExpiryMonth(value)}
            items={months}
            value={expiryMonth}
            required={true}
          />
          <TextInput
            style={[styles.input, { color: "black" }]}
            value={expiryMonth}
            editable={false}
          />
          <RNPickerSelect
            style={pickerStyles}
            placeholder={{ label: "Expiry Year", value: null }}
            onValueChange={(value) => setExpiryYear(value)}
            items={years}
            value={expiryYear}
            required={true}
          />
          <TextInput
            style={[styles.input, { color: "black" }]}
            value={expiryYear}
            editable={false}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
          maxLength={3}
          required={true}
        />
        {cvvError && (
          <Text style={styles.error}>
            CVV should not be longer than 3 digits
          </Text>
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
