import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";



const GetStarted = ({ navigation }) => {
  const svgUrl =
    "https://www.svgrepo.com/show/382362/emoticon-expression-face-liar-face-lie.svg";

  const [scaleValue] = useState(new Animated.Value(1));

  const handleButtonPress = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1, // Adjust the scale factor for expansion
      friction: 4,
      useNativeDriver: false,
    }).start();

    // Delay the navigation for a smoother effect
    setTimeout(() => {
      navigation.navigate("Login"); // Navigate to the Login page
    }, 200); // Adjust the delay as needed
  };

  return (
    <SafeAreaView style={styles.container}>     
      <Animated.Text
        style={[styles.title, { transform: [{ scale: scaleValue }] }]}
      >
        Lie:Detect
      </Animated.Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#88C6FF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Recursive"

  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    padding: 15,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  buttonText: {
    color: "#3498db",
    fontSize: 18,
    fontWeight: "bold",
  },
  
});

export default GetStarted;
