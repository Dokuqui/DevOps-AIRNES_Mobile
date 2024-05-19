import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

function AboutScreen() {
  const year = new Date().getFullYear();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>About Us</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Welcome to our company! We are dedicated to providing the best
          products and services to our customers. Our mission is to create
          innovative solutions that meet your needs and exceed your
          expectations.
        </Text>
        <Text style={styles.paragraph}>
          Founded in {year}, we have consistently strived to improve and
          innovate in our industry. Our team is passionate, skilled, and always
          ready to help you.
        </Text>
        <Text style={styles.paragraph}>
          Thank you for choosing our company. We look forward to serving you!
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Us: contact@company.com</Text>
        <Text style={styles.footerText}>Phone: (123) 456-7890</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "open-bold",
  },
  content: {
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: "shinko-font",
    lineHeight: 24,
    marginBottom: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingTop: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default AboutScreen;
