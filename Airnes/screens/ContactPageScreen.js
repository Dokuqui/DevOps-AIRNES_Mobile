import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import email from "react-native-email";
import Footer from "../components/MainPage/Footer";

function ContactPageScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    setDisabled(true);
    const to = ["i.semenov6990@gmail.com"];

    email(to, {
      subject: data.subject,
      body: `Name: ${data.name}\n\nMessage:\n${data.message}\n\nEmail: ${data.email}`,
    })
      .then(() => {
        Alert.alert(
          "Success",
          "Email was sent successfully! Check your inbox or spam."
        );
        reset();
        setDisabled(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        Alert.alert("Error", "An error occurred, please try again later!");
        setDisabled(false);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:
                  "Please enter a valid email address. Example: example@example.com",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="subject"
            rules={{ required: "Subject is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Subject"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.subject && (
            <Text style={styles.error}>{errors.subject.message}</Text>
          )}

          <Controller
            control={control}
            name="message"
            rules={{ required: "Message is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Message"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
              />
            )}
          />
          {errors.message && (
            <Text style={styles.error}>{errors.message.message}</Text>
          )}

          <Button
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            disabled={disabled}
          />
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "open-bold",
    textAlign: "center",
    marginVertical: 16,
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    fontFamily: "shinko-font",
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ContactPageScreen;
