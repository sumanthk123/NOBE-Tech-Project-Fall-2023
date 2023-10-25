import { async } from "@firebase/util";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Change 'FontAwesome' to the icon library you prefer
import { FIREBASE_AUTH } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Ionicons } from "@expo/vector-icons"; // You can use the Ionicons icon library
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    console.log("Button clicked");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Additional logic for successful sign-up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    console.log("Button clicked");
    setLoading(true); // Set loading to true while the authentication is in progress.

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Additional logic for successful sign-up
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error: ${errorCode} - ${errorMessage}`);
      // Handle the error as needed
    } finally {
      setLoading(false); // Ensure loading is set to false, whether successful or not.
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 70, left: 15 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Go back button pressed");
            navigation.navigate('GetStarted'); 
          }}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Get Started</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={24} color="white" styles={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          placeholderTextColor="white"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={24} color="white" styles={{ marginLeft: 30 }} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          placeholderTextColor="white"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88C6FF", // Background color
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "white", // Text color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding for input container
    margin: 10,
    width: 300, // Set the width to make it smaller in the horizontal direction
  },
  input: {
    flex: 1,
    height: 40,
    color: "white", // Text color
    marginLeft: 20,
  },
  loginButton: {
    backgroundColor: "#2980b9", // Button color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding for button
    marginRight: 10,
  },
  signupButton: {
    backgroundColor: "#16a085", // Button color
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding for button
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  icon: {
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
