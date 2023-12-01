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
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#88C6FF",
      }}
    >
      <View style={{ position: "absolute", top: 70, left: 15 }}>
        <TouchableOpacity
          onPress={() => {
            console.log("Go back button pressed");
            navigation.navigate("GetStarted");
          }}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="ios-arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: 313,
          height: 490,
          position: "absolute",
          backgroundColor: "white",
          borderRadius: 30,
        }}
      >
        <View
          style={{
            width: 273,
            height: 64,
            left: 22,
            top: 137,
            position: "absolute",
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
          }}
        >
          <Icon name="user" size={24} color="#00305F" style={{position: "absolute", top: -40, left: 65}} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
        <View
          style={{
            width: 273,
            height: 65,
            left: 19,
            top: 243,
            position: "absolute",
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
          }}
        >
          <Icon
            name="lock"
            size={24}
            color="#00305F"
            style={{ position: "absolute", top: -35, left: 105 }}
          />

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
        <Text
          style={{
            width: 216,
            height: 51,
            left: 22,
            top: 35,
            position: "absolute",
            color: "#00305F",
            fontSize: 30,
            fontFamily: "Recursive",
            fontWeight: "1000",
            wordWrap: "break-word",
          }}
        >
          Get Started
        </Text>
        <View
          style={{
            width: 272,
            height: 65,
            left: 21,
            top: 328,
            position: "absolute",
            backgroundColor: "#88C6FF",
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            width: 103,
            height: 30,
            left: 22,
            top: 98,
            position: "absolute",
            color: "#00305F",
            fontSize: 20,
            fontFamily: "Recursive",
            fontWeight: "1000",
            wordWrap: "break-word",
          }}
        >
          email
        </Text>
        <Text
          style={{
            width: 192,
            height: 28,
            left: 22,
            top: 207,
            position: "absolute",
            color: "#00305F",
            fontSize: 20,
            fontFamily: "Recursive",
            fontWeight: "1000",
            wordWrap: "break-word",
          }}
        >
          password
        </Text>
        <TouchableOpacity
          style={{
            width: 273,
            height: 60,
            left: 20,
            top: 408,
            position: "absolute",
            backgroundColor: "#2980b9", // Button color
            borderRadius: 10, // Rounded corners
          }}
          onPress={signIn}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Recursive",
              fontWeight: "1000",
              wordWrap: "break-word",
              textAlign: "center",
              position: "absolute",
              left: 105,
              top: 18,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 191, // Set to the same width as the Login button
            height: 30, // Set to the same height as the Login button
            left: 75,
            top: 348,
            position: "absolute",
            backgroundColor: "transparent",
          }}
          onPress={signUp}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: "Recursive",
              fontWeight: "1000",
              wordWrap: "break-word",
              textAlign: "center",
              position: "absolute",
              left: 45,
              top: 0,
            }}
          >
            Sign Up
          </Text>
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
