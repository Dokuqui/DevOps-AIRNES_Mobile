import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { WebView } from 'react-native-webview';

const StripeCheckoutScreen = ({ route, navigation }) => {
  const { url, orderId } = route.params;

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;

    if (url.includes(`http://167.114.113.203:3000/order-completed?orderId=${orderId}`)) {
      Alert.alert(
        "Payment Successful",
        "Your payment was successful!",
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Home"),
          },
        ],
        { cancelable: false }
      )
    }
  };

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: url }}
        onNavigationStateChange={handleWebViewNavigationStateChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StripeCheckoutScreen;
