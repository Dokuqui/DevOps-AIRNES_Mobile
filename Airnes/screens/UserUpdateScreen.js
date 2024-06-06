import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { GlobalStyles } from "../constants/style";
import { getUserInfo } from "../components/util/auth";
import { APIRequest } from "../components/util/helper";
import LoadingOverlay from "../components/UI/loading-overlay";

function UpdateUserScreen() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        setFirstName(userInfo.FirstName);
        setLastName(userInfo.LastName);
        setEmail(userInfo.Mail);
      } catch (error) {
        Alert.alert("Error", "Failed to load user information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const updatedData = {};
    if (firstName !== user.FirstName) updatedData.Firstname = firstName;
    if (lastName !== user.LastName) updatedData.Lastname = lastName;
    if (email !== user.Mail) updatedData.Mail = email;
    if (newPassword) updatedData.Password = newPassword;
    if (oldPassword) updatedData.CurrentPassword = oldPassword;

    if (Object.keys(updatedData).length === 0) {
      Alert.alert("No changes to update");
      return;
    }

    try {
      const response = await APIRequest("put", "Users", updatedData);
      if (response.success) {
        Alert.alert("User info updated");
        setUser({ ...user, ...updatedData });
      } else {
        Alert.alert("Update failed", response.message);
      }
    } catch (error) {
      Alert.alert("Update error", error.message);
    }
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading information..." />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Personal Information</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        required={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        required={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        required={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        value={oldPassword}
        onChangeText={setOldPassword}
        required={false}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        required={false}
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
