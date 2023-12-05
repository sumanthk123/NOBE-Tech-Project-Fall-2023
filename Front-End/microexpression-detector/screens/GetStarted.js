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
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "white",
      }}
    >


      <View
        style={{
          width: 403,
          height: 844,
          left: 0,
          top: 0,
          position: "absolute",
          backgroundColor: "#88C6FF",
        }}
      />
      <View
        style={{
          width: 650,
          height: 405.91,
          left: -136,
          top: 213,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <View
          style={{
            width: 606.2,
            height: 305.28,
            transform: [{ rotate: "-10deg" }],
            transformOrigin: "0 0",
            backgroundColor: "white",
            borderRadius: 84,
          }}
        />
      </View>
      <Text
        style={{
          width: 212,
          height: 47,
          left: 96,
          top: 350,
          position: "absolute",
          color: "#00305F",
          fontSize: 40,
          fontFamily: "Recursive",
          fontWeight: "900",
          wordWrap: "break-word",
        }}
      >
        Lie:Detect
      </Text>
      <TouchableOpacity
        style={{
          width: 192,
          height: 69,
          left: 105,
          top: 411,
          position: "absolute",
          backgroundColor: "#88C6FF",
          borderRadius: 18,
        }}
        onPress={handleButtonPress}
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: "#00305F",
            fontSize: 20,
            fontFamily: "Recursive",
            fontWeight: "900",
            textAlign: "center",
            lineHeight: 24,
            width: 192,
            height: 69,
            top: 20,
            position: "absolute",
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
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
    fontFamily: "Recursive",
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
